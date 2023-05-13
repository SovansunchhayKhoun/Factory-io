<?php

  namespace Database\Seeders;

  use Illuminate\Database\Console\Seeds\WithoutModelEvents;
  use Illuminate\Database\Seeder;
  use Illuminate\Support\Facades\DB;

  class ProductSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run () : void
    {
      DB ::table ( 'products' ) -> insert ( [
        'name' => 'DHT11–Temperature and Humidity Sensor' ,
        'price' => 2 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'sensor1' ,
        'description' => 'Specification <br/>
          Operating Voltage: 3.5V to 5.5V<br/>
          Operating current: 0.3mA (measuring) 60uA (standby)<br/>
          Output: Serial data <br/>
          Temperature Range: 0°C to 50°C <br/>
          Humidity Range: 20% to 90% <br/>
          Resolution: Temperature and Humidity both are 16-bit <br/>
          Accuracy: ±1°C and ±1% <br/>',
        'picture' => 'SN-DHT11-MOD (a)-800x800.jpg',
      ]);

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'DHT11–Temperature and Humidity Sensor' ,
        'price' => 2 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'sensor1' ,
        'description' => 'Specification <br/>
          Operating Voltage: 3.5V to 5.5V<br/>
          Operating current: 0.3mA (measuring) 60uA (standby)<br/>
          Output: Serial data <br/>
          Temperature Range: 0°C to 50°C <br/>
          Humidity Range: 20% to 90% <br/>
          Resolution: Temperature and Humidity both are 16-bit <br/>
          Accuracy: ±1°C and ±1% <br/>',
        'picture' => 'SN-DHT11-MOD (a)-800x800.jpg',
      ]);

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'DHT11–Temperature and Humidity Sensor' ,
        'price' => 2 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'sensor1' ,
        'description' => 'Specification <br/>
          Operating Voltage: 3.5V to 5.5V<br/>
          Operating current: 0.3mA (measuring) 60uA (standby)<br/>
          Output: Serial data <br/>
          Temperature Range: 0°C to 50°C <br/>
          Humidity Range: 20% to 90% <br/>
          Resolution: Temperature and Humidity both are 16-bit <br/>
          Accuracy: ±1°C and ±1% <br/>',
        'picture' => 'SN-DHT11-MOD (a)-800x800.jpg',
      ]);

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'MQ4 Gas Sensor' ,
        'price' => 1.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'sensor2' ,
        'description' => 'Features <br/>
          Good sensitivity to Combustible gas in wide range <br/>
          High sensitivity to CH4, Natural gas. <br/>
          Small sensitivity to alcohol, smoke. <br/>
          Fast response Stable and long life <br/>
          Simple drive circuit <br/>',
        'picture' => 'MQ4-Gas-Sensor.jpg',
      ]);

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'MQ4 Gas Sensor' ,
        'price' => 1.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'sensor2' ,
        'description' => 'Features <br/>
          Good sensitivity to Combustible gas in wide range <br/>
          High sensitivity to CH4, Natural gas. <br/>
          Small sensitivity to alcohol, smoke. <br/>
          Fast response Stable and long life <br/>
          Simple drive circuit <br/>',
        'picture' => 'MQ4-Gas-Sensor.jpg',
      ]);

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'MQ4 Gas Sensor' ,
        'price' => 1.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'sensor2' ,
        'description' => 'Features <br/>
          Good sensitivity to Combustible gas in wide range <br/>
          High sensitivity to CH4, Natural gas. <br/>
          Small sensitivity to alcohol, smoke. <br/>
          Fast response Stable and long life <br/>
          Simple drive circuit <br/>',
        'picture' => 'MQ4-Gas-Sensor.jpg',
      ]);

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'LM393 Sound Detection Sensor Module' ,
        'price' => 2.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'sensor3' ,
        'description' => 'Operating Voltage: 3.3V to 5V DC <br/>
          LM393 comparator with threshold preset <br/>
          PCB Size: 3.4cm * 1.6cm <br/>
          Induction distance: 0.5 Meter <br/>
          Operating current:  4~5 mA <br/>
          Microphone Sensitivity (1kHz): 52 to 48 dB <br/>
          Easy to use with Microcontrollers or even with normal Digital/Analog IC <br/>
          Small, cheap and easily available <br/>',
        'picture' => 'Sound-Detection-Sensor-Module.jpg',
        ]);

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'LM393 Sound Detection Sensor Module' ,
        'price' => 2.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'sensor3' ,
        'description' => 'Operating Voltage: 3.3V to 5V DC <br/>
          LM393 comparator with threshold preset <br/>
          PCB Size: 3.4cm * 1.6cm <br/>
          Induction distance: 0.5 Meter <br/>
          Operating current:  4~5 mA <br/>
          Microphone Sensitivity (1kHz): 52 to 48 dB <br/>
          Easy to use with Microcontrollers or even with normal Digital/Analog IC <br/>
          Small, cheap and easily available <br/>',
        'picture' => 'Sound-Detection-Sensor-Module.jpg',
      ]);

      DB ::table ( 'products' ) -> insert ( [
        'name' => 'LM393 Sound Detection Sensor Module' ,
        'price' => 2.5 ,
        'qty' => 10 ,
        'status' => 1 ,
        'type' => 'sensor3' ,
        'description' => 'Operating Voltage: 3.3V to 5V DC <br/>
          LM393 comparator with threshold preset <br/>
          PCB Size: 3.4cm * 1.6cm <br/>
          Induction distance: 0.5 Meter <br/>
          Operating current:  4~5 mA <br/>
          Microphone Sensitivity (1kHz): 52 to 48 dB <br/>
          Easy to use with Microcontrollers or even with normal Digital/Analog IC <br/>
          Small, cheap and easily available <br/>',
        'picture' => 'Sound-Detection-Sensor-Module.jpg',
      ]);


    }
  }
