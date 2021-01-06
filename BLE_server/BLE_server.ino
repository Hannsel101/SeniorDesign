#include <C:\Users\XboxGaming\OneDrive\Documents\Arduino\libraries\ESP32_BLE_Arduino\src\BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include "heltec.h"

#include "BMS_BLE_Config.h"
#include "OLED_Display.h"

void setup() {

  // Setup the initial display configurations
  setupDisplay();
  
  // Initialize Serial Communication at 115200 buadrate
  Serial.begin(115200);

  // Configure and start BLE communication packets
  BMS_BLE.configBLE();
}

void loop() {
  // Clear the display buffer
  Heltec.display->clear();
  Heltec.display->drawRect(0, 0, 128, 64);
  
  // wait for a BLE central
  BMS_BLE.waitForCentral();

  // Debugging text
  if(BMS_BLE.connectionActive())
    {
      drawConnected();
      drawSensorReadings(5, 5, 5);
    }
  else
    {
      drawDisconnected();
    }
  Heltec.display->display();
  delay(100);
}
