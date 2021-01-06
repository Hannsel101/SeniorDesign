// Created by: Hannselthill Camacho
// Date: 1/4/2021
// Time: 3:04 PM (PST)
// Purpose: Header file for handling all the BLE defines and custom made functions of the Bluetooth Low Energy
//          side of the Battery Management System

#ifndef BMS_BLE_Config_h
#define BMS_BLE_Config_h


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
     * Attempt Connection to a central device and store its information
     */
    void waitForCentral();
    
    /*
     * Application layer pseudo-random number generator authenticator for increased BLE
     * security.
     */
    void passKeyAuth();

    /*
     * Queries whether an active connection is established to a central device.
     * Returns: true if active, false if no connection is to a central is present
     */
    bool connectionActive();

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
