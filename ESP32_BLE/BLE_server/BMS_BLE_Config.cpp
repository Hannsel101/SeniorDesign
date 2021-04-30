// Created by: Hannselthill Camacho
// Date: 1/4/2021
// Time: 3:04 PM (PST)
// Purpose: Source file for handling all the BLE defines and custom made functions of the Bluetooth Low Energy
//          side of the Battery Management System

#include <Arduino.h>
#include <C:\Users\XboxGaming\OneDrive\Documents\Arduino\libraries\ESP32_BLE_Arduino\src\BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <BLE2902.h>
#include "BMS_BLE_Config.h"


/*
 * BLE Defines and Constants
 */
#define DEVICE_NAME         "Battery Management System"
#define BMS_SERVICE_UUID        "99eb64db-cd4c-470a-b0af-4b9ad1379cd1"
#define BATTERY_STATUS_CHAR_UUID "5ae13f53-46ad-4fce-a27b-03ffe6ad9d75"
#define BATTERY_SWITCHING_CHAR_UUID "24a2a282-5fd5-4262-8490-a465ab0d9413"


//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
/*
 * Callback Functions for server connect and disconnect events
 */
class ServerCallbacks: public BLEServerCallbacks
{
  void onConnect(BLEServer* pServer)
  {
    Serial.println("Connected to device"); 
  };

  void onDisconnect(BLEServer* pServer)
  {
    Serial.println("Disconnected from device");
  };
};
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
/*
 * Callback functions for when a connected device attempts to read or write
 */
 class ServerCharacteristicCallback: public BLECharacteristicCallbacks 
 {
  void onRead(BLECharacteristic* pCharacteristic)
  {
   Serial.println("Attempted to read");  
  };

  void onWrite(BLECharacteristic* pCharacteristic)
  {
    std::string val = pCharacteristic->getValue();

    // Switch statement to handle battery switching
    switch (val[0]){
      case '0':
        digitalWrite(C0, LOW);
        digitalWrite(C1, LOW);
        digitalWrite(C2, LOW);
        break;
      case '1':
        digitalWrite(C0, HIGH);
        digitalWrite(C1, LOW);
        digitalWrite(C2, LOW);
        break;
      case '2':
        digitalWrite(C0, LOW);
        digitalWrite(C1, HIGH);
        digitalWrite(C2, LOW);
        break;
      case '3':
        digitalWrite(C0, HIGH);
        digitalWrite(C1, HIGH);
        digitalWrite(C2, LOW);
        break;
      case '4':
        digitalWrite(C0, LOW);
        digitalWrite(C1, LOW);
        digitalWrite(C2, HIGH);
        break;
      case '5':
        digitalWrite(C0, HIGH);
        digitalWrite(C1, LOW);
        digitalWrite(C2, HIGH);
        break;
      case '6':
        digitalWrite(C0, LOW);
        digitalWrite(C1, HIGH);
        digitalWrite(C2, HIGH);
        break;
      case '7':
        digitalWrite(C0, HIGH);
        digitalWrite(C1, HIGH);
        digitalWrite(C2, HIGH);
        break;
      default:
        Serial.println("Error Invalid Command");
        break;
    }
    
  };
 };
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
/*
 * Function Definitions for BLE_Server Class
 */
BLE_Server::BLE_Server()
{
  connectedToCentral = false;
}
//---------------------------------------------------------------------------------//
void BLE_Server::configBLE()
{
  // Initialize the device with a device name
  BLEDevice::init(DEVICE_NAME);

  // Set the device as a server
  pServer = BLEDevice::createServer();

  // Set callbacks for connection events for the server
  pServer->setCallbacks(new ServerCallbacks());

  // Set the services to use
  setServices();

  // Set the characteristics
  setCharacteristics();

  // Start the service
  pService->start();

  // Configure the advertising intervals and settings
  configAdvertising();

  // Begins advertising characteristics, services, and device name
  BLEDevice::startAdvertising();
}
//---------------------------------------------------------------------------------//
void BLE_Server::setServices()
{
  pService = pServer->createService(BMS_SERVICE_UUID);
}
//---------------------------------------------------------------------------------//
void BLE_Server::setCharacteristics()
{
  // Add the characteristic for viewing UBP updates (READ ONLY)
  batteryStatusCharacteristic = pService->createCharacteristic(
                                         BATTERY_STATUS_CHAR_UUID,
                                         BLECharacteristic::PROPERTY_READ | 
                                         BLECharacteristic::PROPERTY_NOTIFY |
                                         BLECharacteristic::PROPERTY_INDICATE
                                       );

  BLE2902* p2902Descriptor = new BLE2902();
  p2902Descriptor->setNotifications(true);
  p2902Descriptor->setIndications(true);
  batteryStatusCharacteristic->addDescriptor(p2902Descriptor);

  // Add the characteristic for sending commands to switch between batteries (WRITE ONLY)
  batterySwitchingCharacteristic = pService->createCharacteristic(
                                         BATTERY_SWITCHING_CHAR_UUID,
                                         BLECharacteristic::PROPERTY_WRITE
                                       );                                    

  // Set an initial value for the UBP status update while debugging
  //batteryStatusCharacteristic->setValue("UBP Status Updates");
  UBPupdate UBP2;
  UBP2.voltage = 12.90;
  char test[12];
  float hel = 12.00;
  String thisString = String(UBP2.voltage);
  char arr[15];
  arr[0] = '2';
  arr[1] = thisString[0];
  arr[2] = thisString[1];
  arr[3] = thisString[2];
  arr[4] = thisString[3];
  arr[5] = thisString[4];
  arr[6] = '0';
  arr[7] = '9';
  arr[8] = '.';
  arr[9] = '5';
  arr[10] = '2';
  arr[11] = '0';
  arr[12] = '5';
  arr[13] = '3';
  arr[14] = '\0';
  //test[0] = (UBP2.voltage >> 8) & 0b11111111;
  //test[1] = UBP2.voltage & 0b11111111;
  batteryStatusCharacteristic->setValue("Hello");

  // Set callback functions that are handled when a value is read or written to
  // For each characteristic
  batteryStatusCharacteristic->setCallbacks(new ServerCharacteristicCallback());
  batterySwitchingCharacteristic->setCallbacks(new ServerCharacteristicCallback());
}
//---------------------------------------------------------------------------------//
void BLE_Server::configAdvertising()
{
  // Allows the device advertisement capabilities
  pAdvertising = BLEDevice::getAdvertising();

  // Add services to advertisement packet
  pAdvertising->addServiceUUID(BMS_SERVICE_UUID);

  // Advertisement settings
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  //pAdvertising->setMinPreferred(0x12);
}
//---------------------------------------------------------------------------------//
void BLE_Server::sendUpdate(uint8_t val)
{
  batteryStatusCharacteristic->setValue((uint8_t*)&val, 4);
  batteryStatusCharacteristic->notify();
  delay(4);
}
//---------------------------------------------------------------------------------//
bool BLE_Server::connectionActive()
{
  if(pServer->getConnectedCount())
  {
    pAdvertising->stop();
    return true;
  }
  else
  {
    pAdvertising->start();
    return false;
  }
}

BLE_Server BMS_BLE = BLE_Server();
