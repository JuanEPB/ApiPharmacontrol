-- Diff de esquema generado contra la DB local `pharmacontrol`.
-- Objetivo: alinear la DB con las entidades TypeORM actuales sin borrar tablas viejas.

CREATE TABLE `plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `precio_mensual` decimal(10,2) NOT NULL,
  `limiteFarmacias` int NOT NULL DEFAULT '1',
  `limiteUsuarios` int NOT NULL DEFAULT '10',
  `limiteReportes` int NOT NULL DEFAULT '100',
  `limiteRegistros` int NOT NULL DEFAULT '100',
  `periodo_prueba_dias` int NULL,
  `movil` tinyint NOT NULL DEFAULT 0,
  `IA` tinyint NOT NULL DEFAULT 0,
  `nivel_soporte` varchar(255) NOT NULL DEFAULT 'Básico',
  `descripcion` varchar(255) NULL,
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `actualizado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  UNIQUE INDEX `IDX_650aa30458ddad557676d23dea` (`nombre`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `empresa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `direccion` varchar(255) NULL,
  `email_contacto` varchar(100) NULL,
  `telefono_contacto` varchar(20) NULL,
  `estado` varchar(255) NOT NULL DEFAULT 'activo',
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_expiracion` datetime NULL,
  `plan_id` int NULL,
  UNIQUE INDEX `IDX_050fffc050c015802aced7e33c` (`rfc`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `farmacia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `direccion` varchar(255) NULL,
  `telefono` varchar(20) NULL,
  `email` varchar(100) NULL,
  `lema` varchar(255) NULL,
  `logo_url` varchar(255) NULL,
  `activo` tinyint NOT NULL DEFAULT 1,
  `fecha_registro` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `empresa_id` int NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `suscripcion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_inicio` timestamp NOT NULL,
  `fecha_fin` timestamp NULL,
  `activa` tinyint NOT NULL DEFAULT 1,
  `monto_pagado` decimal(10,2) NOT NULL DEFAULT '0.00',
  `estado_pago` varchar(255) NOT NULL DEFAULT 'pendiente',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `actualizado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `empresa_id` int NULL,
  `plan_id` int NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `historial_importacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` timestamp NOT NULL,
  `cantidad` int NOT NULL,
  `detalles` text NOT NULL,
  `usuarioId` int NULL,
  `medicamentoId` int NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_pedido` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `fecha_recibido` datetime NULL,
  `estatus` enum ('ENVIADO', 'RECIBIDO', 'CANCELADO') NOT NULL DEFAULT 'ENVIADO',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `proveedor_id` int NULL,
  `farmacia_id` int NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `pedido_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(12,2) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `lote` varchar(255) NULL,
  `fecha_caducidad` date NULL,
  `pedido_id` int NULL,
  `medicamento_id` int NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `configuracion_empresa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logo_url` varchar(255) NULL,
  `lema` varchar(255) NULL,
  `color_primario` varchar(255) NULL,
  `color_secundario` varchar(255) NULL,
  `mostrar_marca` tinyint NOT NULL DEFAULT 1,
  `fecha_creacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `fecha_actualizacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `empresa_id` int NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

ALTER TABLE `venta` ADD `farmacia_id` int NULL;
ALTER TABLE `usuarios` ADD `farmacia_id` int NULL;
ALTER TABLE `usuarios` CHANGE `rol` `rol` enum ('admin', 'usuario', 'chatbot') NOT NULL DEFAULT 'usuario';

ALTER TABLE `suscripcion`
  ADD CONSTRAINT `FK_c6188f621edf9d2226edf1dfa10`
  FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`id`)
  ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `suscripcion`
  ADD CONSTRAINT `FK_1939515d42ac07b667e25088978`
  FOREIGN KEY (`plan_id`) REFERENCES `plan`(`id`)
  ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `empresa`
  ADD CONSTRAINT `FK_d126972f274e7d33f9f89fc207e`
  FOREIGN KEY (`plan_id`) REFERENCES `plan`(`id`)
  ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `venta`
  ADD CONSTRAINT `FK_e6316d3e6394bcdab6eb5c7743e`
  FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`)
  ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `farmacia`
  ADD CONSTRAINT `FK_d14448c060c287d8ac1abcb4a90`
  FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`id`)
  ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_b15b324e48e79da68ff6997faf1`
  FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`)
  ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `historial_importacion`
  ADD CONSTRAINT `FK_738b3229f4163cde7e28c76682b`
  FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`)
  ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `historial_importacion`
  ADD CONSTRAINT `FK_27eee5537c56d74a6b5ceee1f18`
  FOREIGN KEY (`medicamentoId`) REFERENCES `medicamentos`(`id`)
  ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `pedidos`
  ADD CONSTRAINT `FK_2016370a56fd6cbf9c12c31902e`
  FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores`(`id`)
  ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `pedidos`
  ADD CONSTRAINT `FK_784662f86ca5c4005017201477e`
  FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`)
  ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `pedido_items`
  ADD CONSTRAINT `FK_8b8ebfbaf432feb890739eb925c`
  FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`)
  ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `pedido_items`
  ADD CONSTRAINT `FK_9f5bd1013fbf745cfb49b91e4c6`
  FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos`(`id`)
  ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `configuracion_empresa`
  ADD CONSTRAINT `FK_5274def3cb2192f33b2a78392a6`
  FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`id`)
  ON DELETE CASCADE ON UPDATE NO ACTION;
