<?php

//definición de variables que se consultarán en el servidor
$ciudad = htmlspecialchars($_GET['ciudad']);
$tipo = htmlspecialchars($_GET['tipo']);
$precio = htmlspecialchars($_GET ['precio']);

//debemos sacar precio máximo y mínimo

$posi =strpos($precio,';');
$precioMenor= substr($precio,0, $posi);
$precioMayor= substr($precio, $posi+1);

//Abrimos base de datos para consultar información

$bfile = fopen("data-1.json", "r") or die("No es posible abrir la base de datos");

$bjson = fread($bfile, filesize('data-1.json'));
$data = json_decode($bjson,true);

//Filtro de precios
$r = array();
foreach($data as $i){
    $price = $i['Precio'];
    $price = substr($price,strpos($price,'$')+1);
    $m = strpos($price,',');
    $price = substr($price,0,$m).substr($price,$m+1);
    if ($price>=$precioMenor && $price <=$precioMayor) {
        array_push($r, $i);
    }
}
//Filtros por Ciudad y tipo según búsqueda
$result = array();
if(!empty($ciudad) && !empty($tipo)){
    foreach($r as $x){
        if($x['Ciudad']===$ciudad && $x['Tipo']==$tipo){
            array_push($result, $x);
        }
    }
}elseif (!empty($ciudad)) {
    foreach($r as $x){
        if($x['Ciudad']==$ciudad){
            array_push($result,$x);
        }
    }
}elseif (!empty($tipo)) {
    foreach($r as $x){
        if($x['Tipo']==$tipo){
            array_push($result, $x);
        }
    }
}else{
    $result = $r;
}

$rjson = json_encode($result);
echo '{"result":"success", "message": "Resultado exitoso", "data":'.$rjson.'}';

fclose($bfile);

?>