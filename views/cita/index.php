<h1 class="nombre-pagina">Nueva Cita</h1>
<p class="descripcion-pagina">Elige los servicios para tu cita.</p>

<?php
   include_once __DIR__ . '/../templates/barra.php';
?>

<div id="app">
    <nav class="tabs">
        <button class="actual" type='button' data-paso="1">Servcios</button>
        <button type='button' data-paso="2">Info Cita</button>
        <button type='button' data-paso="3">Resumen</button>
    </nav>
    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center">Elige los servicios:</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>
    <div id="paso-2" class="seccion">
        <h2>Datos y Cita</h2>
        <p class="text-center">Indica tus datos y fecha para tu cita:</p>
        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" value="<?php echo $nombre; ?>" disabled id='nombre' placeholder="Tu nombre" />
            </div>
            <div class="campo">
                <label for="fecha">Fecha</label>
                <input type="date" id='fecha' min="<?php echo date('Y-m-d', strtotime('+1 day')) ?>" />
            </div>

            <div class="campo">
                <label for="hora">Hora</label>
                <input type="time" id='hora' />
            </div>
            <input type="hidden" name="id" id="id" value="<?php echo $id; ?>">
        </form>
    </div>
    <div id="paso-3" class="seccion contenido-resumen">
        <h2>Resumen</h2>
        <p class="text-center">Veifica la informacion de la cita:</p>
    </div>
    <div class="paginacion">
        <button id="anterior" class="boton">&laquo; Anetrior</button>
        <button id="siguiente" class="boton">Siguiente &raquo;</button>
    </div>
</div>

<?php
$script = "
<script src='//cdn.jsdelivr.net/npm/sweetalert2@11'></script>
      <script src='build/js/app.js'></script>;
    "
?>