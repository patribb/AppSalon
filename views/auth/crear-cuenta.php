<h1 class="nombre-pagina">Crear Cuenta</h1>
<p class='descripcion-pagina'>Regístrate para crear una nueva cuenta.</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form action="/crear-cuenta" class="formulario" method="POST">
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" value="<?php echo s($usuario->nombre) ?>" placeholder="Tu nombre">
    </div>
    <div class="campo">
        <label for="apellidos">Nombre</label>
        <input type="text" id="apellidos" value="<?php echo s($usuario->apellidos) ?>" name="apellidos" placeholder="Tus apellidos">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono</label>
        <input type="tel" id="telefono" value="<?php echo s($usuario->telefono) ?>" name="telefono" placeholder="Tu numero de teléfono">
    </div>
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" value="<?php echo s($usuario->email) ?>" placeholder="Tu email">
    </div>
    <div class="campo">
        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password" placeholder="Tu contraseña">
    </div>
    <input type="submit" value="Crear cuenta" class="boton" />
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? <span>Iniciar Sesión</span></a>
</div>