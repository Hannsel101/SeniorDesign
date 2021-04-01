#include <C:\Users\XboxGaming\OneDrive\Documents\Arduino\libraries\ESP32_BLE_Arduino\src\BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include "heltec.h"
#include "DHT.h"

#include "BMS_BLE_Config.h"
#include "OLED_Display.h"

// Global Define used to set a polling rate for taking UPB readings and sending them over BLE 
#define POLLING_RATE 1000

// variables used for measuring time
unsigned long startTime, currTime;

DHT dht(TEMP, DHT11);

void setup() {
  Heltec.begin(true, false, true);
  // Setup the display
  Heltec.display->flipScreenVertically();

  // Display initial splash screen
  Heltec.display->clear();
  Heltec.display->drawXbm(posX, posY, picRick_width, picRick_height, picRick_bits);
  Heltec.display->display();
  
  // Initialize Serial Communication at 115200 buadrate
  Serial.begin(115200);
  dht.begin();
  delay(2000);

  // Configure and start BLE communication packets
  BMS_BLE.configBLE();

  // Configure the Pins for output and input
  pinMode(C0, OUTPUT);
  pinMode(C1, OUTPUT);
  pinMode(C2, OUTPUT);

  digitalWrite(C0, LOW);
  digitalWrite(C1, LOW);
  digitalWrite(C2, LOW);
}

void loop() {
  // Clear the display buffer and refresh the GUI
  Heltec.display->clear();
  Heltec.display->drawRect(0, 0, 128, 64);


  float h = dht.readHumidity();
  float t = dht.readTemperature();

  Serial.print("\nHumidity: ");
  Serial.println(h);
  Serial.print("Temperature: ");
  Serial.println(t);
  
  // If connected to a central device then begin transmitting sensor data periodically and 
  // accept commands at any moment
  if(BMS_BLE.connectionActive())
  {
      uint8_t val = 0;
      
      // Update LCD to show readings
      drawConnected();

      while(BMS_BLE.connectionActive())
      {
        BMS_BLE.sendUpdate(val);
        val++;
        break;
        delay(100);
      }
      drawSensorReadings(5,5,t);
  }
  else
  {
    drawDisconnected();
  }
  Heltec.display->display();
  delay(1000);
}
