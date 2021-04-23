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

  // Set the number of bits used for ADC conversions
  adcAttachPin(VOLT);
  analogReadResolution(12);
}

void loop() {
  // Clear the display buffer and refresh the GUI
  Heltec.display->clear();
  Heltec.display->drawRect(0, 0, 128, 64);


  float h = dht.readHumidity();
  float t = dht.readTemperature();
  delay(50);

  Serial.print("\nHumidity: ");
  Serial.println(h);
  Serial.print("Temperature: ");
  Serial.println(t);

  //int inRead = analogRead(VOLT);
  double inputVolt = ReadVoltage(38);
  double bRes = 4096;

  Serial.print("Raw: ");
  Serial.println(inputVolt);

  inputVolt = inputVolt*11.18;
  Serial.print("Voltage: ");
  Serial.println(inputVolt);

  
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



double ReadVoltage(byte pin){
  double reading = analogRead(pin); // Reference voltage is 3v3 so maximum reading is 3v3 = 4095 in range 0 to 4095
  if(reading < 1 || reading > 4095) return 0;
  // return -0.000000000009824 * pow(reading,3) + 0.000000016557283 * pow(reading,2) + 0.000854596860691 * reading + 0.065440348345433;
  return -0.000000000000016 * pow(reading,4) + 0.000000000118171 * pow(reading,3)- 0.000000301211691 * pow(reading,2)+ 0.001109019271794 * reading + 0.034143524634089;
} // Added an improved polynomial, use either, comment out as required