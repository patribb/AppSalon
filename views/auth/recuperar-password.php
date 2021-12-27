<h1 class="nombre-pagina">Recuperar Contraseña</h1>
<p class="descripcion-pagina">Indica tu nueva contraseña a continuación.</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<?php if($error) return; ?>
<form class="formulario" method="POST">
    <div class="campo">
        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password" placeholder="Nueva contraseña" />
    </div>
    <input class='boton' type="submit" value="Guardar">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? <span>Iniciar Sesión</span></a>
    <a href="/crear-cuenta">¿Aún no tiene una cuenta? <span>Crear una</span></a>
</div>