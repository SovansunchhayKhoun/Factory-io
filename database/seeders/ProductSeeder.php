<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            'name' => 'DHT11–Temperature and Humidity Sensor',
            'price' => 2,
            'qty' => 10,
            'status' => 1,
            'type' => 'sensor',
            'description' => 'Specification <br/>
          Operating Voltage: 3.5V to 5.5V<br/>
          Operating current: 0.3mA (measuring) 60uA (standby)<br/>
          Output: Serial data <br/>
          Temperature Range: 0°C to 50°C <br/>
          Humidity Range: 20% to 90% <br/>
          Resolution: Temperature and Humidity both are 16-bit <br/>
          Accuracy: ±1°C and ±1% <br/>',
            'image' => 'products/SN-DHT11-MOD (a)-800x800.jpg',
        ]);

        DB::table('products')->insert([
            'name' => 'MQ4 Gas Sensor',
            'price' => 1.5,
            'qty' => 10,
            'status' => 1,
            'type' => 'sensor',
            'description' => 'Features <br/>
          Good sensitivity to Combustible gas in wide range <br/>
          High sensitivity to CH4, Natural gas. <br/>
          Small sensitivity to alcohol, smoke. <br/>
          Fast response Stable and long life <br/>
          Simple drive circuit <br/>',
            'image' => 'products/MQ4-Gas-Sensor.jpg',
        ]);

        DB::table('products')->insert([
            'name' => 'LM393 Sound Detection Sensor Module',
            'price' => 2.5,
            'qty' => 10,
            'status' => 1,
            'type' => 'sensor',
            'description' => 'Operating Voltage: 3.3V to 5V DC <br/>
          LM393 comparator with threshold preset <br/>
          PCB Size: 3.4cm * 1.6cm <br/>
          Induction distance: 0.5 Meter <br/>
          Operating current:  4~5 mA <br/>
          Microphone Sensitivity (1kHz): 52 to 48 dB <br/>
          Easy to use with Microcontrollers or even with normal Digital/Analog IC <br/>
          Small, cheap and easily available <br/>',
            'image' => 'products/Sound-Detection-Sensor-Module.jpg',
        ]);

        DB::table('products')->insert([
            'name' => 'Arduino uno',
            'price' => 2.5,
            'qty' => 10,
            'status' => 1,
            'type' => 'MicroController',
            'description' => 'MICROCONTROLLER   ATmega328P<br/>
          USB CONNECTOR   USB-B<br/>
          PINS  BUILT-IN LED PIN  13<br/>
          DIGITAL I/O PINS  14<br/>
          ANALOG INPUT PINS  6<br/>
          PWM PINS  6<br/>
          COMMUNICATION  UART  Yes<br/>
          I2C  Yes<br/>
          SPI  Yes<br/>
          POWER  I/O VOLTAGE  5V<br/>
          INPUT VOLTAGE (NOMINAL)  7-12V<br/>
          DC CURRENT PER I/O PIN  20 mA<br/>',
            'image' => 'products/Microcon.png',
        ]);

        DB::table('products')->insert([
            'name' => 'ESP32 + CP2102',
            'price' => 2.5,
            'qty' => 10,
            'status' => 1,
            'type' => 'MicroController',
            'description' => 'Operating Voltage: 2.2 to 3.6VDC<br/>
          Ultra-low power consumption<br/>
          32 GPIO: ADC(12), DAC(2), SPI(3), I2S(2), I2C(2), UART(3), PWM(32), SDIO(50 Mhz)<br/>
          520 KB SRAM<br/>
          16 MB Flash<br/>
          802.11BGN HT40 WiFi Transceiver (-98 dBm minimum sensitivity)<br/>
          Max data rate: 150 Mbps<br/>
          -40°C to 125°C operating temperature<br/>
          55.3mm x 28.0mm x 12.3mm<br/>
          Weight: 9.6g<br/>
          CP2102: USB Driver<br/>',
            'image' => 'products/Unk.png',
        ]);

        DB::table('products')->insert([
            'name' => 'Arduino Nano',
            'price' => 2.5,
            'qty' => 10,
            'status' => 1,
            'type' => 'MicroController',
            'description' => 'Operating Voltage (logic level): 5V<br/>
          8 analog inputs ports: A0 ~ A7<br/>
          14 Digital input / output ports: TX, RX, D2 ~ D13<br/>
          1 pair of TTL level serial transceiver ports RX / TX<br/>
          Using Atmel Atmega328P-AU MCU<br/>
          Standard 0.1” spacing DIP (breadboard friendly).<br/>',
            'image' => 'products/arduinonano.png',
        ]);

        DB::table('products')->insert([
            'name' => 'Raspberry pi Pico',
            'price' => 2.5,
            'qty' => 10,
            'status' => 1,
            'type' => 'MicroController',
            'description' => 'MCU: RP2040<br/>
          Dual-core ARM Cortex M0+ processor, flexible clock running up to 133 MHz<br/>
          264kB of SRAM, and 2MB of on-board Flash memory<br/>
          Drag & drop programming using over USB<br/>
          8×Programmable IO (PIO) state machines for custom peripheral support<br/>',
            'image' => 'products/ras.png',
        ]);

    }
}
