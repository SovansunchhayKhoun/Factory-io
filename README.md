# Please do the following before running the program

### Run the following commands

`composer install`

`cp .env.example .env`

`php artisan key:generate`

`php artisan migrate:fresh --seed`

### If  there's nothing in the database, run this command to create some fake items to work with

`php artisan tinker` then `App\Models\Product::factory()->count(10)->create()`

### Press `ctrl + c` a few times on that terminal to exit that mode

### Then run

`cd .\react-vite\ ` to get into react-vite's root directory

### At react-vite directory, run these commands

`npm install`

`cp .env.example .env`

### After that

`npm run dev` at react-vite folder directory then visit localhost:3000 to actually start the application

### E-mail and Password for Admin Login

E-mail: `admin@domain.com`

Password: `admin`
  
