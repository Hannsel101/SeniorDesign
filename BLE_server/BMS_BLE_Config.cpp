// Created by: Hannselthill Camacho
// Date: 1/4/2021
// Time: 3:04 PM (PST)
// Purpose: Source file for handling all the BLE defines and custom made functions of the Bluetooth Low Energy
//          side of the Battery Management System

#include <Arduino.h>
#include <C:\Users\XboxGaming\OneDrive\Documents\Arduino\libraries\ESP32_BLE_Arduino\src\BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include "BMS_BLE_Config.h"


/*
 * BLE Defines and Constants
 */
#define DEVICE_NAME         "Battery Management System"
#define BMS_SERVICE_UUID        "99eb64db-cd4c-470a-b0af-4b9ad1379cd1"
#define BATTERY_STATUS_CHAR_UUID "5ae13f53-46ad-4fce-a27b-03ffe6ad9d75"
#define BATTERY_SWITCHING_CHAR_UUID "24a2a282-5fd5-4262-8490-a465ab0d9413"


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
                                         BLECharacteristic::PROPERTY_READ
                                       );

  // Add the characteristic for sending commands to switch between batteries (WRITE ONLY)
  batterySwitchingCharacteristic = pService->createCharacteristic(
                                         BATTERY_SWITCHING_CHAR_UUID,
                                         BLECharacteristic::PROPERTY_WRITE
                                       );
                                       
  batteryStatusCharacteristic->setValue("UBP Status Updates");
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
  pAdvertising->setMinPreferred(0x12);
}
//---------------------------------------------------------------------------------//
void BLE_Server::waitForCentral()
{

}
//---------------------------------------------------------------------------------//
void BLE_Server::passKeyAuth()
{
  
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
