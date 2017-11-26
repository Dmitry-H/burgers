<?php
/**
 * Created by PhpStorm.
 * User: Dmitry
 * Date: 23.11.2017
 * Time: 11:44
 */

if (isset($_POST['name']) &&
    isset($_POST['phone']) &&
    isset($_POST['street']) &&
    isset($_POST['building']) &&
    isset($_POST['housing']) &&
    isset($_POST['room']) &&
    isset($_POST['commentary']) &&
    isset($_POST['payment'])) {

    switch($_POST['payment']) {
        case 'cash':
            $payment = 'потребуется сдача';
            break;
        case 'card':
            $payment = 'оплата по карте';
            break;
    }

    $recall = (isset($_POST['no-recall'])) ? 'нет' : 'да';

    $address = "haysd@yandex.ru";
    $theme = "Заказ бургеров";
    $message = "Данные по заказу:\n" .
        "Имя: ${_POST['name']}\n" .
        "Телефон: ${_POST['phone']}\n" .
        "Улица: ${_POST['street']}\n" .
        "Дом: ${_POST['building']}\n" .
        "Корпус: ${_POST['housing']}\n";

    if (isset($_POST['floor']) && $_POST['floor'] != '') {
        $message .= "Этаж: ${_POST['floor']}\n";
    }

    $message .= "Квартира: ${_POST['room']}\n" .
                "Комментарий:\n${_POST['commentary']}\n" .
                "Оплата: ${payment}\n" .
                "Перезвонить: ${recall}";

    $result = mail($address, $theme, $message, "Content-type: text/plain; charset=\"utf-8\"");
    if ($result) {
        $answer["ans"] = "ok";
    }
    else {
        $answer["ans"] = "error";
    }
}
else {
    $answer["ans"] = ("error");
}

echo json_encode($answer);