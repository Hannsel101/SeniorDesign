// Created by: Hannselthill Camacho
// Date: 1/5/2021
// Time: 3:46 PM (PST)
// Purpose: source File for displaying information on the integrated OLED display of the 
//          esp32 for debugging and testing the BLE pass key authentication

#include "heltec.h"
#include "OLED_Display.h"

void drawPickle()
{
  Heltec.display->drawXbm(posX, posY, picRick_width, picRick_height, picRick_bits);  
}
//---------------------------------------------------------------------------------//
void drawConnected()
{
  // Align the text to be centered and specify a font size of 16
  Heltec.display->setTextAlignment(TEXT_ALIGN_CENTER);
  Heltec.display->setFont(ArialMT_Plain_16);

  // Add the text to the display buffer
  Heltec.display->drawString(64, 0, "Connected");

  // Add a horizontal line to the display buffer
  Heltec.display->drawHorizontalLine(0,16, 128);
}
//---------------------------------------------------------------------------------//
void drawDisconnected()
{
  // Align the text to be centered and specify a font size of 16
  Heltec.display->setTextAlignment(TEXT_ALIGN_CENTER);
  Heltec.display->setFont(ArialMT_Plain_16);

  // Add the text to the display buffer
  Heltec.display->drawString(64, 0, "Disconnected");

  // Add a horizontal line to the display buffer
  Heltec.display->drawHorizontalLine(0,16, 128);
}
//---------------------------------------------------------------------------------//
void drawSensorReadings(uint8_t health, float charge, float temperature)
{
  // Left align the text and specify a font size of 10
  Heltec.display->setTextAlignment(TEXT_ALIGN_LEFT);
  Heltec.display->setFont(ArialMT_Plain_10);

  // Add "Health: " and the status of health to the display buffer
  Heltec.display->drawString(3, 18, "Health: ");
  Heltec.display->drawString(43, 18, "Great");

  // Convert the status of charge from unsigned integer to string format
  // then add "Charge: " and the status of charge to the display buffer
  String chargeS = String(charge);
  Heltec.display->drawString(3, 30, "Charge: ");
  Heltec.display->drawString(43, 30, String(chargeS + "%"));

  // Convert the temperature from unsigned integer to string format
  // then add "Temperature: " and the temperature to the display buffer
  // along with the degree symbol specified by "\xC2\xB0"
  String temp = String(temperature);
  Heltec.display->drawString(3, 42, "Temperature: ");
  Heltec.display->drawString(69, 42, String(temp + "\xC2\xB0" + "C"));
}
//---------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------//
