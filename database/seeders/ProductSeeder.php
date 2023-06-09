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
      'type' => 'Sensor',
      'description' => 'Specification
Operating Voltage: 3.5V to 5.5V
Operating current: 0.3mA (measuring) 60uA (standby)
Output: Serial data
Temperature Range: 0°C to 50°C
Humidity Range: 20% to 90%
Resolution: Temperature and Humidity both are 16-bit
Accuracy: ±1°C and ±1%' ,
        'feature' => 'feature' ,
        'image' => 'products/SN-DHT11-MOD (a)-800x800.jpg' ,
      ] );

    DB::table('products')->insert([
      'name' => 'MQ4 Gas Sensor',
      'price' => 1.5,
      'qty' => 10,
      'status' => 1,
      'type' => 'Sensor',
      'description' => 'Features
          Good sensitivity to Combustible gas in wide range
          High sensitivity to CH4, Natural gas.
          Small sensitivity to alcohol, smoke.
          Fast response Stable and long life
          Simple drive circuit ' ,
        'feature' => 'feature' ,
        'image' => 'products/MQ4-Gas-Sensor.jpg' ,
      ] );

    DB::table('products')->insert([
      'name' => 'LM393 Sound Detection Sensor Module',
      'price' => 2.5,
      'qty' => 10,
      'status' => 1,
      'type' => 'Sensor',
      'description' => 'Operating Voltage: 3.3V to 5V DC
          LM393 comparator with threshold preset
          PCB Size: 3.4cm * 1.6cm
          Induction distance: 0.5 Meter
          Operating current:  4~5 mA
          Microphone Sensitivity (1kHz): 52 to 48 dB
          Easy to use with Microcontrollers or even with normal Digital/Analog IC
          Small, cheap and easily available ' ,
        'feature' => 'feature' ,
        'image' => 'products/Sound-Detection-Sensor-Module.jpg' ,
      ] );

    DB::table('products')->insert([
      'name' => 'Arduino uno',
      'price' => 2.5,
      'qty' => 10,
      'status' => 1,
      'type' => 'Microcontroller',
      'description' => 'MICROCONTROLLER   ATmega328P
          USB CONNECTOR   USB-B
          PINS  BUILT-IN LED PIN  13
          DIGITAL I/O PINS  14
          ANALOG INPUT PINS  6
          PWM PINS  6
          COMMUNICATION  UART  Yes
          I2C  Yes
          SPI  Yes
          POWER  I/O VOLTAGE  5V
          INPUT VOLTAGE (NOMINAL)  7-12V
          DC CURRENT PER I/O PIN  20 mA' ,
        'feature' => 'feature' ,
        'image' => 'products/Microcon.png' ,
      ] );

    DB::table('products')->insert([
      'name' => 'ESP32 + CP2102',
      'price' => 2.5,
      'qty' => 10,
      'status' => 1,
      'type' => 'Microcontroller',
      'description' => 'Operating Voltage: 2.2 to 3.6VDC
          Ultra-low power consumption
          32 GPIO: ADC(12), DAC(2), SPI(3), I2S(2), I2C(2), UART(3), PWM(32), SDIO(50 Mhz)
          520 KB SRAM
          16 MB Flash
          802.11BGN HT40 WiFi Transceiver (-98 dBm minimum sensitivity)
          Max data rate: 150 Mbps
          -40°C to 125°C operating temperature
          55.3mm x 28.0mm x 12.3mm
          Weight: 9.6g
          CP2102: USB Driver' ,
        'feature' => 'feature' ,
        'image' => 'products/Unk.png' ,
      ] );

    DB::table('products')->insert([
      'name' => 'Arduino Nano',
      'price' => 2.5,
      'qty' => 10,
      'status' => 1,
      'type' => 'Microcontroller',
      'description' => 'Operating Voltage (logic level): 5V
          8 analog inputs ports: A0 ~ A7
          14 Digital input / output ports: TX, RX, D2 ~ D13
          1 pair of TTL level serial transceiver ports RX / TX
          Using Atmel Atmega328P-AU MCU
          Standard 0.1” spacing DIP (breadboard friendly).',
      'image' => 'products/arduinonano.png',
    ]);

    DB::table('products')->insert([
      'name' => 'Raspberry pi Pico',
      'price' => 2.5,
      'qty' => 10,
      'status' => 1,
      'type' => 'Microcontroller',
      'description' => 'MCU: RP2040
          Dual-core ARM Cortex M0+ processor, flexible clock running up to 133 MHz
          264kB of SRAM, and 2MB of on-board Flash memory
          Drag & drop programming using over USB
          8×Programmable IO (PIO) state machines for custom peripheral support',
      'image' => 'products/ras.png',
    ]);
    DB::table('products')->insert([
      'name' => 'RGB LED - 5mm - Common Cathode',
      'price' => 2.5,
      'qty' => 10,
      'status' => 1,
      'type' => 'Microcontroller',
      'description' => 'The 4 leg RGB LED is an ideal component</br>
            that can be used in projects that require
            multicolor displays. A single RGB LED serves the purpose
            of three individual different color LEDs. The
            RGB name stands for Red colour, Blue color,
            and Green color respectively. To produce more colors,
            the RGB LED can colour mix the three primary colors (RGB)
            through Pulse Width Modulation (PWM). This component
            can be easily configured in a common cathode connection,
            where the ground is connected to the negative terminal
            and the three other pins are connected to the positive
            terminal.',
      'image' => 'products/LED.png',
    ]);

    DB::table('products')->insert([
      'name' => '555 Timer IC',
      'price' => 0.5,
      'qty' => 10,
      'status' => 1,
      'type' => 'Microcontroller',
      'description' => 'The 555 timer IC can operate over a wide</br>
        range of power supply voltages, typically from 4.5 volts to 18 volts,
         and can handle output currents up to 200 mA. It finds numerous applications
          in electronic circuits, including timing circuits, frequency generators,
           pulse-width modulation (PWM) circuits, LED flashers, tone generators, and many more.',
      'image' => 'products/timer.png',
    ]);

    DB::table('products')->insert([
      'name' => 'Temperature Sensor',
      'price' => 0.5,
      'qty' => 10,
      'status' => 1,
      'type' => 'Microcontroller',
      'description' => 'This sealed digital temperature probe lets you precisely</br>
        measure temperatures in wet environments with a simple 1-Wire interface.
         The DS18B20 provides 9 to 12-bit (configurable) temperature readings
          over a 1-Wire interface, so that only one wire (and ground) needs
           to be connected from a central microprocessor.' ,
        'feature' => 'Features
3.0-5.5V input voltage
Waterproof
-55°C to+125°C temperature range
±0.5°C accuracy from -10°C to +85°C
1 Wire interface
Probe is 7mm in diameter and roughly 26mm
 Overall length (including wire) is 6 feet.
Note: The pinout for this sensor is as follows: RED=Vcc BLACK=GND WHITE=SIG' ,
        'image' => 'products/ts.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'LDR' ,
        'price' => 0.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'This is a very small light sensor. A photocell changes
(also called a photodetector, photo resistor, CdS or photoconductive cell)
resistance depending on the amount of light it is exposed to. These little
sensors make great ambient light triggers (when light in the room turns
on, do something).' ,
        'feature' => 'Features
Light resistance : ~1k Ohm
Dark resistance : ~10k Ohm
Max voltage : 150V
Max power: 100mW* 2 x 4 x 5mm
4mm between pins
31mm lead length' ,
        'image' => 'products/sen.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'PIR Motion Detection Sensor - HC SR501' ,
        'price' => 0.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'To ensure the safety and security of our homes or anywhere,
it is essential we install alarm systems.
Motion sensors are one of the essential components of these systems.
We can also employ PIR (Passive Infrared) Sensors for doing the same.
HC-SR501 is a low-cost PIR sensor that can detect the presence of humans or animals by sensing the Infrared Radiation coming out of the body.
Its sensitivity can be controlled by sensitivity control potentiometer and it also has an onboard signal conditioning circuitry and Fresnel Lens to improve its field of view.
It is used in Motion Activated lights in bathrooms, halls, rooms, etc. in alarm applications, etc.' ,
        'feature' => 'Features
Supply Voltage 5V
Output 3.3V TTL Logic
Infrared Sensor with Control Circuit Board
The Sensitivity and Holding Time Can be Adjusted
Can cover 120° and 7m range
Low power consumption 65mA
Temperature Range -20°C to 80°C' ,
        'image' => 'products/ds.png' ,
      ] );
      DB ::table ( 'products' ) -> insert ( [
        'name' => 'IR Receiver Diodv' ,
        'price' => 0.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'Use this simple IR receiver for infrared remote control
          of your next project. With low power consumption and an easy to use.
          It mates well with embedded electronics and can be used with common IR remotes.
          The TSOP382 is a miniaturized receiver for infrared remote control systems. A PIN diode and a preamplifier are assembled on a lead frame while the epoxy package acts as an IR filter. The demodulated output signal can be directly decoded by a microprocessor. The TSOP382 is compatible with all common IR remote control data formats.' ,
        'feature' => 'Features
Operating Voltage: 2.5V to 5.5V
Operating Current: 350μA
Output Current: 5mA
Carrier Frequency: 38 kHz
Transmission Distance: 45 m
Operating Temperature Range: -25 to 85C
Pd - Power Dissipation: 10mW' ,
        'image' => 'products/dia.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'Capacitive Soil Moisture Sensor V2.0' ,
        'price' => 0.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'This V2.0 capacitive soil moisture sensor measures soil moisture
        through a capacitive sensor, not a resistive sensor like other sensors on the market.
        It is made of anti-corrosion material, providing excellent service life. Attach it to the soil around your plants and impress your friends with real-time soil moisture data!
        This module includes an integrated voltage regulator providing it with an operating voltage range of 3.3 ~ 5.5V. It is perfect for low voltage microcontrollers, both 3.3V and 5V. For compatibility with Raspberry Pi, an ADC adapter is required.' ,
        'feature' => 'Features
Supports 3-Pin Gravity Sensor interface
Analog output' ,
        'image' => 'products/csms.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'Capacitive Soil Moisture Sensor V2.0' ,
        'price' => 0.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'The TTP223 touch sensor module can be easily used with microcontrollers
          like Arduino to act as a touch input. It can replace the boring push button with touch pads and is also easy to use. The module uses the TTP223 IC to detect the touch on a capacitive pad.
          Features
          Operating Voltage: 2V to 5.5V
          No. of channel: 1
          Output high: 0.8*Vcc
          Output low: 0.3*Vcc
          Response time: 220mS' ,
        'feature' => 'feature' ,
        'image' => 'products/touch.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'Vibration/Shock Sensor Module (SW420)' ,
        'price' => 0.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'The SW420 Vibration Sensor Module is based on SW-420 Vibration Sensor,
          which works on the principle that when the movement or vibration occurs, the circuit
          will be briefly disconnected and output low. Hence the normal state of this sensor is closed.
          The sensitivity of the SW420 Sensor can be controlled by an onboard potentiometer and LM393
           Comparator IC. This is very useful in detecting Collisions, Burglary protection alarm systems,
           Vibration alert systems, etc.
            Features
            SW-420 based sensor, normally closed type vibration sensor
            Supply voltage: 3.3V-5V
            On-board LM393 Comparator IC
            The comparator output sensitivity can be changed with the help of a potentiometer.
            Output form: digital switch output (0 and 1)
            On-board indicator LED to show the results
            Has a fixed bolt hole for convenient installation' ,
        'feature' => 'feature' ,
        'image' => 'products/vib.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'EM4100 125khz RFID Key Fob (RFID Tag)' ,
        'price' => 0.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'A plain RFID tag key with a permanent and unique non reprogrammable 32-bit ID
          which can be read using a RFID reader. This Tag key works with normal 125kHz RF range and the
          unique ID in it can be used to identify people/objects for access control or other automation
          applications. It is a passive type RFID tag which means it does not have a power source attached
          to it. Whenever a transmitter comes into the range it will energise the coil present in the tag
          through Electromagnetic Induction. This energy powers the microchip inside which in turn sends a
          feedback response to the transmitter. The transmitter receives this unique feedback and identifies
          the Tag. The key is plain on both side which enables you to print your logo and other details on
          the tag using laser printing. It can be used in Home Automation, Identification, Anti Theft Systems,
          Medical Tags etc. applications.
          Features
          Passive RFID Tag key
          32bit Unique ID
          64-bit data stream (Header+ID+Data+Parity)
          Reading Distance about 5 to 12 cm (depending upon the reader)
          Note: Color is only for illustrative purpose, it may be vary.' ,
        'feature' => 'feature' ,
        'image' => 'products/charm.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'HC-05 Bluetooth Module' ,
        'price' => 0.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'The IoT enabled projects require two way communication between the microcontroller
        and various sensors. There are various methods you can do that, Wired Communication, WiFi, Bluetooth
        are some among them. The HC-05 Bluetooth Module adds wireless communication to your project to communicate
        via Bluetooth to any Bluetooth enabled Laptop or Mobile Device. The module communicates at 9600 baud rate via
        USART protocol. It can be used in applications like communication between two microcontrollers, data logging,
        wireless robots, wireless sensors data acquisition and home automation.
        Features
        Profiles: Bluetooth serial port Profile
        Dimension: 26.9mm x 13mm x 2.2 mm
        Bluetooth protocol: Bluetooth Specification v2.0+EDR
        Frequency: 2.4GHz ISM band, Range
        Modulation: GFSK (Gaussian Frequency Shift Keying)
        Sensitivity: -84dBm at 0.1% BER
        Speed: Asynchronous: 2.1Mbpsmax / 160 kbps, Synchronous: 1Mbps/1Mbps
        Emission power: 4dBm, Class 2
        Power supply: +3.3V, 50mA
        Security: Authentication and encryption
        Working temperature: -20°C to +75°C' ,
        'feature' => 'feature' ,
        'image' => 'products/hc.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => '10K Ohm Potentiometer - Large 3 Pin 15mm Potentiometer' ,
        'price' => 1 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'Potentiometers are very useful in changing the electrical parameters of a system.
        It is a resistive type potentiometer which you can use to change RC constant of a circuit, changing
        the voltage level at comparator, changing the audio output volume, changing the brightness of any LCD screen,
        even measuring the rotary movement if it is used as a transducer, controlling the precise movement
        of servo motors and other control applications. This potentiometer is a rotary type resistive potentiometer
         where the wiper moves along the circular path and the total resistance of the resistive part is 10kΩ.
         It’s a 3-pin single turn type rotary potentiometer so you can not control ultra precise applications with it.
        Features
        Rotary type shaft potentiometer
        15mm shaft length
        Total Resistance 10kΩ' ,
        'feature' => 'feature' ,
        'image' => 'products/ohm.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => '5KG Load Cell - Weight Sensor for Electronic kitchen weighing Scale' ,
        'price' => 1 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'To measure weight and load of any object we use strain gauges but problem with
         using standalone strain gauge is that they are fragile and are easily bent and break if not used
         in proper enclosure. This load cell made up of aluminium alloy can measure upto 5 kg load and outputs
         in the form of electrical signals proportionally. This sensor will use a HX711 Analog to Digital signal
        converter, it is easy to use with driving voltage 5-10V and produce the output voltage as per the force
        changes over it, to read and send the data to the microcontroller or development board you are using
        as the analog signal from the load cell is too small to be read easily. They are used in Platform scales,
        Electronic weighing machines, belt scales etc.
        Note: The HX711 Load Cell Amplifier Sensor module has to be purchased separately.
        Features
        Differential input voltage: ±40mV (Full-scale differential input voltage is ± 40mV)
        Data accuracy: 24 bit (24 bit A / D converter chip.)
        Refresh frequency: 10/80 Hz
        Operating Voltage: 2.7V to 5VDC
        Operating current: <10 mA
        5kg Load Cell Measuring Range' ,
        'feature' => 'feature' ,
        'image' => 'products/scale.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'KY-036 Metal Touch Sensor Module' ,
        'price' => 1 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'In industry the exact position of the metal tool in CNC or Lathe machines or
        the robotic arms in automated systems is very important and essential to ensure your program is
         working correctly. Also counting the number of parts on a production belt is necessary to keep
         the data logged. This Ky-036 Metal Touch Sensor Module is a low cost solution of the above mentioned
         problems. It has a LM393 Comparator IC onboard which will provide Digital Output to be connected to
         GPIO Pins to your microcontroller. It also has resistive potentiometer to change the sensitivity
         of the output to touch. It also has M2 sized bolt holes for easy installation
          Features
          Working Voltage: 5V
          Low cost, Low Power Device
          Adjustable Sensitivity with onboard potentiometer
          Digital and Analog Output' ,
        'feature' => 'feature' ,
        'image' => 'products/tt.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'IR Speed Sensor Module Based on LM393' ,
        'price' => 1 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'Speed sensing is very important in industrial applications in which process
        control require precise speed control of production belts to control the rate of manufacturing
        and also in robotics and autonomous system to determine the exact position of the arm or the tool
        and its movement. In industry we use two types of speed sensors magnetic induction sensors and
        Infrared sensors. This 4 Pin Infrared Speed Sensor Module is used in the speed control applications
         where you need to read rotation of a disk. It is powered by any of the 3.3V or 5V supply and gives
          digital output, which you can easily read with the help of interrupt function on your microcontroller
           or development board.
        <b>Features</b>
        Groove width is about 5mm
        LM393 Comparator onboard to give digital output
        Low power requirement
        Sensor output High when object is detected inn groove otherwise Low
        4 Pins VCC, GND, Dout and Aout' ,
        'feature' => 'feature' ,
        'image' => 'products/lm.png' ,
      ] );

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'NRF24L01 2.4F RF Transceiver Module' ,
        'price' => 1 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'Sensor' ,
        'description' => 'Radio Frequency Modules are mostly used to add wireless capability to your project,
        you can use Wi-Fi modules or Bluetooth modules also but Radio Frequency modules will provide a longer
        range without the need of the internet and hence commonly used for RC control. This 2400 MHz RF Transceiver
        Module is ultra-low power RF transceiver IC for the ISM (Industrial Scientific and Medical) band. The nRF
        Module has a transmission range of about 200m. It communicates with SPI communication protocols.
        The nRF24L01 module is used in many applications like communication between two devices directly,
        home automation, wireless alarm systems, Robot control and monitoring systems, Remote sensing of
        temperatures and pressures or any sensor output, etc.
        Features
        Low working voltage: 1.9 to 3.6 V
        I/O input voltage: 5V
        Wireless rate: 1 or 2 MBPS
        SPI interface rate: 0 to 8MBPS
        Transmission distance: 200 meters
        Dimensions: Width: 30 mm, Height: 10 mm, Depth: 20 mm
        Weight: 30 g' ,
        'feature' => 'feature' ,
        'image' => 'products/nrf.png' ,
      ] );

    }
  }
