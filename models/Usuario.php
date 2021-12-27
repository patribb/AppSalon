<?php

namespace Model;

class Usuario extends ActiveRecord
{
    // Base de datos
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'apellidos', 'email', 'password', 'telefono', 'admin', 'confirmado', 'token'];

    public $id;
    public $nombre;
    public $apellidos;
    public $email;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellidos = $args['apellidos'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? '0';
        $this->confirmado = $args['confirmado'] ?? '0';
        $this->token = $args['token'] ?? '';
    }

    // Mensajes de validación para la creación de una cuenta
    public function validarNuevaCuenta()
    {
        if(!$this->nombre) {
            self::$alertas['error'][] = '✋El nombre es necesario.';
        }

        if(!$this->apellidos) {
            self::$alertas['error'][] = '✋Indica al menos un apellido.';
        }

        if(!$this->email) {
            self::$alertas['error'][] = '✋El email es necesario.';
        }

        if(!$this->telefono) {
            self::$alertas['error'][] = '✋Indica un numero de contacto.';
        }

        if(!$this->password) {
            self::$alertas['error'][] = '✋La contraseña es necesaria.';
        }

        if(strlen($this->password) < 6) {
            self::$alertas['error'][] = '✋La contraseña debe contener al menos 6 caracteres.';
        }

        return self::$alertas;
    }

    public function validarLogin()
    {
        if(!$this->email) {
            self::$alertas['error'][] = '✋El email es necesario.';
        }

        if(!$this->password) {
            self::$alertas['error'][] = '✋La contraseña es necesaria.';
        }

        return self::$alertas;
    }

    public function validarEmail()
    {
        if(!$this->email) {
            self::$alertas['error'][] = '✋El email es necesario.';
        }

        return self::$alertas;
    }

    public function validarPassword()
    {
        if(!$this->password) {
            self::$alertas['error'][] = '✋La contraseña es necesaria.';
        }

        if(strlen($this->password) < 6) {
            self::$alertas['error'][] = '✋La contraseña debe contener al menos 6 caracteres.';
        }

        return self::$alertas;
    }

    // Revisa si el usuario ya existe
    public function existeUsuario()
    {
        $query = "SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email ."' LIMIT 1";
        $resultado = self::$db->query($query);
        if($resultado->num_rows) {
            self::$alertas['error'][] = '😓El usuario ya existe. Inicia sesión';
        }
        
        return $resultado;
    }

    public function hashPassword()
    {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function crearToken()
    {
        $this->token = uniqid();
    }

    public function comprobarPasswordAndVerificado($password)
    {
        $resultado = password_verify($password, $this->password);
        if(!$resultado  || !$this->confirmado) {
           self::$alertas['error'][] = '✋Su contraseña es incorrecta o debe confirmar su cuenta.';
        } else {
            return true;
        }
    }
}
