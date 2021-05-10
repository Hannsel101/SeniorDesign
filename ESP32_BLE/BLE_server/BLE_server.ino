#include <C:\Users\XboxGaming\OneDrive\Documents\Arduino\libraries\ESP32_BLE_Arduino\src\BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include "heltec.h"
#include "DHT.h"

#include "BMS_BLE_Config.h"
#include "OLED_Display.h"

// Initialize a DHT object for temperature and humidity readings
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

  // Configure the output pins for sending commands
  pinMode(C0, OUTPUT);
  pinMode(C1, OUTPUT);
  pinMode(C2, OUTPUT);

  digitalWrite(C0, LOW);
  digitalWrite(C1, LOW);
  digitalWrite(C2, LOW);

  // Configure ADC input pins by attaching them to the internal ADC hardware
  adcAttachPin(VOLT);
  adcAttachPin(VOLT_UBP1);
  adcAttachPin(VOLT_UBP2);
  adcAttachPin(VOLT_UBP3);

  // Set the number of bits used for ADC conversions
  analogReadResolution(12);
}

void loop() {
  // Clear the display buffer and refresh the GUI
  Heltec.display->clear();
  Heltec.display->drawRect(0, 0, 128, 64);


  // Read in temperature and humidity through the DHT-11
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  delay(50);

  // Read in the input voltages for the UBPs and the total voltage being output by the system
  double inputVolt = ReadVoltage(VOLT)*11.18;
  delay(10);
  double inputUBP1 = ReadVoltage(VOLT_UBP1)*11.18;
  delay(10);
  double inputUBP2 = ReadVoltage(VOLT_UBP2)*11.18;
  delay(10);
  double inputUBP3 = ReadVoltage(VOLT_UBP3)*11.18;

  
  // If connected to a central device then begin transmitting sensor data periodically and 
  // accept commands at any moment
  if(BMS_BLE.connectionActive())
  {    
      // Update LCD to show readings
      drawConnected(); 
      drawSensorReadings(5, inputVolt, t);
      String systemTemp = String(t);
      String totalVoltage;
      String UBP1Voltage;
      String UBP2Voltage;
      String UBP3Voltage;

      totalVoltage = stringifyVolt(inputVolt);
      UBP1Voltage = stringifyVolt(inputUBP1);
      UBP2Voltage = stringifyVolt(inputUBP2);
      UBP3Voltage = stringifyVolt(inputUBP3);

      // Add a leading 0 for tempature readings under 10 degrees celcius
      if(t < 10)
        systemTemp = "0" + String(t);
      else
        systemTemp = String(t);

      BMS_BLE.sendUpdate(totalVoltage, UBP1Voltage, UBP2Voltage, UBP3Voltage, systemTemp);
  }
  else
  {
    drawDisconnected();
  }
  Heltec.display->display();
  delay(500);
}


// Polynomial conversion function to reduce percentage of error produced by the ESP32 Internal ADC
double ReadVoltage(byte pin){
  double reading = analogRead(pin); // Reference voltage is 3v3 so maximum reading is 3v3 = 4095 in range 0 to 4095
  if(reading < 1 || reading > 4095) return 0;
  return -0.000000000000016 * pow(reading,4) + 0.000000000118171 * pow(reading,3)- 0.000000301211691 * pow(reading,2)+ 0.001109019271794 * reading + 0.034143524634089;
}

// Stringify the input voltages and add a leading 0 for voltages under 10 volts
String stringifyVolt(double inputVolt){
  // Add a leading 0 for voltages under 10 volts
  if(inputVolt < 10)
    return ("0" + String(inputVolt));
  else
    return String(inputVolt);
}