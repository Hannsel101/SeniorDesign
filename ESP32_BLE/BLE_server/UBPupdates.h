// Created by: Hannselthill Camacho
// Date: 2/15/2021
// Time: 1:52 AM (PST)
// Purpose: Data structure for organizing the memory space used by a UBP update and a custom BLE characteristic class to frame the
//          structure for sending over BLE
#include <Arduino.h>
#include <C:\Users\XboxGaming\OneDrive\Documents\Arduino\libraries\ESP32_BLE_Arduino\src\BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#ifndef UBPUPDATES_h
#define UPBUPDATES_h

/*
 * A data structure containing all the parameters that define a UBP status update
 */
typedef struct UBPupdate
{
  uint8_t numBatteries = 0;
  uint8_t temperature = 0;
  uint8_t voltage = 0;
  uint8_t current = 0;
};
 #endif
