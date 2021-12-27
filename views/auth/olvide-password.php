<h1 class="nombre-pagina">Restablecer Contraseña</h1>
<p class="descripcion-pagina">Restablece tu contraseña mediante email.</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form action="/olvide" class="formulario" method="POST">
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Tu email" />
    </div>
    <input type="submit" value="Solicitar" class="boton" />
</form>

<div class="acciones">
<a href="/crear-cuenta">¿Aún no tiene una cuenta? <span>Crear una</span></a>
    <a href="/">¿Ya tienes una cuenta? <span>Iniciar Sesión</span></a>
</div>