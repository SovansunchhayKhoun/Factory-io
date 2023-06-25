<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Reset Password</title>
</head>
<style>
  h3{
    font-family: 'Poppins', Arial, serif;
  }
  p{
    font-family: 'Poppins', Arial, serif;
  }
  a{
    font-family: 'Poppins', Arial, serif;
  }
</style>
<body>
<div>
  <h3>Hi {{$name}} !</h3>
  <p>We received a request to reset the password for your account. If you did not request this, please ignore this email.</p>
  <p>To reset your password, click on the following link:</p>
  <a href="http://localhost:3000/reset-password/{{$token}}">Password Reset Link</a>
  <p>Once you have reset your password, you will be able to log in to your account using your new password.</p>
  <p>If you have any questions, please do not hesitate to contact us.</p>
  <p>Thank you,</p>
  <p>Maker.io</p>
</div>

</body>
</html>
