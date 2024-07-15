<?php

$name = $_POST['user_name'];
$email = $_POST['user_email'];
$message = $_POST['user_message'];
$token = "7299962989:AAHtj8YtBha_LPQ0wDmy7W7vY6D5-sh5s3Q";
$chat_id = "-4235054041";
$arr = array(
  'Имя пользователя: ' => $name,
  'Email: ' => $email,
  'Message' => $message
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
//   header('Location: thank-you.html');
} else {
  echo "Error";
}
?>