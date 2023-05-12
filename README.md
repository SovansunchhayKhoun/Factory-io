# Please do the following before running the program
  ### Run the following commands
  `composer install`
  
  `cp .env.example .env`

  `php artisan key:generate`

  `php artisan migrate`

  `php artisan db:seed --class=UserSeeder`

  ### If  there's nothing in the database, run this command to create some fake items to work with
  
  `php artisan tinker` then `App\Models\Product::factory()->count(10)->create()`
  ### Press `ctrl + c` a few times on that terminal to exit that mode

  ### Then run
 `cd .\react-vite\` then `npm install`
  
  after that
  `npm run dev` at react-vite folder directory then visit localhost:3000 to actually start the application

### E-mail and Password for Admin Login
E-mail: admin@domain.com

Password: admin
  
