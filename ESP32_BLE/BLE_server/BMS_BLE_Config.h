// Created by: Hannselthill Camacho
// Date: 1/4/2021
// Time: 3:04 PM (PST)
// Purpose: Header file for handling all the BLE defines and custom made functions of the Bluetooth Low Energy
//          side of the Battery Management System

#include "UBPupdates.h"

#ifndef BMS_BLE_Config_h
#define BMS_BLE_Config_h

// Command pins from BLE received commands
#define C0 22
#define C1 0
#define C2 23

// Sensor Pins
#define TEMP 17
#define VOLT 38
#define CURR 38
#define BATS 39

class BLE_Server
{
  public:
    BLE_Server();
    bool connectedToCentral;
    
    /*
     * configBLE is a top level function that calls upon the other BLE configuration functions to setup the
     * services, characteristics, and security used by the BMS
     * Calls: configBLE(), setServices(), setCharacteristics(), passKeyAuth()
     */
    void configBLE();
    
    /*
     * Set the services to be broadcast by the BLE server
     */
    void setServices();
    
    /*
     * Configure the Battery status and Battery Switching Characteristics.
     */
    void setCharacteristics();

    /*
     * Configure timing intervals and settings of advertising packets
     */
    void configAdvertising();

    /*
     * Queries whether an active connection is established to a central device.
     * Returns: true if active, false if no connection is to a central is present
     */
    bool connectionActive();

    /*
     * Function to manually send a UBP update from the server without the client requesting the update
     */
     void sendUpdate(String updateCharge, String updateTemp);

    private:
      BLEServer *pServer;
      BLEService *pService;
      BLECharacteristic *batteryStatusCharacteristic;
      BLECharacteristic *batterySwitchingCharacteristic;
      BLEAdvertising *pAdvertising;
      BLEDevice central;
};

extern BLE_Server BMS_BLE; 

#endif
