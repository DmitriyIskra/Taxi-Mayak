<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    //    require './phpmailer/src/Exception.php';
    //    require './phpmailer/src/PHPMailer.php';

    require '/home/c/cq96411/public_html/PHPMailer-6.8.0/src/Exception.php';
    require '/home/c/cq96411/public_html/PHPMailer-6.8.0/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->Charset = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    // Откого письмо
    $mail->setFrom('info@taxi-mayak.ru', 'Такси по Крыму'); // не использовать mail
    // Кому отправить
    $mail->addAddress('mayak.evgeny@yandex.ru');
    // Тема письма
    $mail->Subject = 'Заявка с сайта';


    // Тело письма
    $body = '<h1>Заявка с сайта</h1>';

    if(trim(!empty($_POST['name']))) {  // Проверка на наличие соответствующего поля в форме, если есть то добавляем в тело письма, если нет не добавляем
        $body.='<p><strong>Имя</strong>'.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['tel']))) {
        $body.='<p><strong>Телефон</strong>'.$_POST['tel'].'</p>';
    }
    if(trim(!empty($_POST['date-arrive']))) {
        $body.='<p><strong>Дата прибытия</strong>'.$_POST['date-arrive'].'</p>';
    }
    if(trim(!empty($_POST['time-arrive']))) {
        $body.='<p><strong>Время прибытия</strong>'.$_POST['time-arrive'].'</p>';
    }
    if(trim(!empty($_POST['number-flight']))) {
        $body.='<p><strong>Номер рейса</strong>'.$_POST['number-flight'].'</p>';
    }
    if(trim(!empty($_POST['number-wagon']))) {
        $body.='<p><strong>Номер вагона</strong>'.$_POST['number-wagon'].'</p>';
    }
    if(trim(!empty($_POST['car-class']))) {
        $body.='<p><strong>Класс авто</strong>'.$_POST['car-class'].'</p>';
    }
    if(trim(!empty($_POST['type-chair-first']))) {
        $body.='<p><strong>Первое кресло</strong>'.$_POST['type-chair-first'].'</p>';
    }
    if(trim(!empty($_POST['amount-chairs1']))) {
        $body.='<p><strong>Количество первых кресел</strong>'.$_POST['amount-chairs1'].'</p>';
    }
    if(trim(!empty($_POST['type-chair-second']))) {
        $body.='<p><strong>Второе кресло</strong>'.$_POST['type-chair-second'].'</p>';
    }
    if(trim(!empty($_POST['amount-chairs2']))) {
        $body.='<p><strong>Количество вторых кресел</strong>'.$_POST['amount-chairs2'].'</p>';
    }
    if(trim(!empty($_POST['order__meet']))) {
        $body.='<p><strong>Встреча с табличкой</strong>'.$_POST['order__meet'].'</p>';
    }


    $mail->Body = $body;


    if(!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!';
    }

    $responce = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($responce);
?>