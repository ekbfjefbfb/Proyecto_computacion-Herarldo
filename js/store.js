(function () {
    'use strict';

    /* =====================================================
       DATA — Productos y categorias
       ===================================================== */
    var CATEGORIES = [
        { key: 'laptops',     name: 'Trabajo fluido',   label: 'Laptops',     desc: 'Equipos ligeros y pro para escribir, crear, editar y presentar sin esperar.', icon: 'laptop',     img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1100&h=900&fit=crop', meta: 'Desde $899', count: '3 modelos' },
        { key: 'smartphones', name: 'Todo en el bolsillo', label: 'Smartphones', desc: 'Camara, pantalla, bateria y 5G para moverte todo el dia.', icon: 'smartphone', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1100&h=900&fit=crop', meta: 'Desde $549', count: '3 modelos' },
        { key: 'tablets',     name: 'Pantalla en mano',   label: 'Tablets',     desc: 'Lectura, diseno, firma digital y entretenimiento en pantalla tactil.', icon: 'tablet',     img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1100&h=900&fit=crop', meta: 'Desde $329', count: '2 modelos' },
        { key: 'accesorios',  name: 'Setup limpio',     label: 'Accesorios',  desc: 'Audio, carga, teclado y mouse para que tu escritorio se sienta terminado.', icon: 'headphones', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1100&h=900&fit=crop', meta: 'Desde $39', count: '4 piezas' },
        { key: 'gaming',      name: 'Juego sin corte',  label: 'Gaming',      desc: 'Monitor, control y consola para jugar con respuesta rapida y buena imagen.', icon: 'gamepad-2',  img: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=1100&h=900&fit=crop', meta: 'Desde $69', count: '3 opciones' },
        { key: 'smart-home',  name: 'Casa conectada',    label: 'Smart Home',  desc: 'Asistentes, camaras, interruptores y sensores para automatizar tu hogar.', icon: 'wifi',       img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1100&h=900&fit=crop', meta: 'Desde $29', count: '3 dispositivos' }
    ];

    var PRODUCTS = [
        { id: 1,  name: 'NovaBook Air 13',         cat: 'laptops',     price: 899,  old: null,  specs: '8GB RAM · 256GB SSD · Intel i5',        icon: 'laptop',          img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop', rating: 4.5, reviews: 128, badge: null,
            images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop'],
            desc: 'Ultraligera, potente y con bateria para todo el dia. La NovaBook Air 13 esta disenada para profesionales y estudiantes que necesitan rendimiento sin peso extra. Su pantalla Liquid Retina de 13.3 pulgadas ofrece colores vibrantes y detalle extremo.',
            highlights: [
                { icon: 'cpu', title: 'Intel Core i5', desc: 'Rendimiento fluido para multitarea' },
                { icon: 'battery-full', title: '18h bateria', desc: 'Trabajo completo sin cargador' },
                { icon: 'monitor', title: 'Liquid Retina', desc: '13.3" P3 wide color · 500 nits' },
                { icon: 'weight', title: '1.24 kg', desc: 'Ultraligera para llevar a cualquier lado' }
            ],
            descSpecs: [
                { k: 'Procesador', v: 'Intel Core i5-1335U — 10 nucleos (2P + 8E)' },
                { k: 'GPU', v: 'Intel Iris Xe — 80 EU' },
                { k: 'Memoria RAM', v: '8GB LPDDR5' },
                { k: 'Almacenamiento', v: '256GB SSD NVMe' },
                { k: 'Pantalla', v: '13.3" Liquid Retina — 2560x1600 — 60Hz' },
                { k: 'Puertos', v: '2x Thunderbolt 4 · MagSafe 3 · Jack 3.5mm' },
                { k: 'Conectividad', v: 'Wi-Fi 6E · Bluetooth 5.3' },
                { k: 'Bateria', v: '52.6Wh — Hasta 18 horas' },
                { k: 'Peso', v: '1.24 kg' }
            ] },
        { id: 2,  name: 'NovaBook Pro 14',         cat: 'laptops',     price: 1299, old: 1499, specs: '16GB RAM · 512GB SSD · Intel i7',       icon: 'laptop',          img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop', rating: 4.8, reviews: 342, badge: 'Mas vendido',
            images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop'],
            desc: 'La bestia silenciosa. Con chip Intel i7 de 13a generacion, 16GB RAM y pantalla ProMotion 120Hz, esta laptop esta hecha para creadores de contenido, desarrolladores y profesionales que exigen rendimiento constante.',
            highlights: [
                { icon: 'cpu', title: 'Intel i7 13a gen', desc: '14 nucleos de rendimiento' },
                { icon: 'memory-stick', title: '16GB RAM', desc: 'Multitarea extrema sin lag' },
                { icon: 'monitor', title: 'ProMotion 120Hz', desc: '14" QHD+ fluido como el agua' },
                { icon: 'battery-full', title: '22h bateria', desc: 'El dia completo sin pausa' }
            ],
            descSpecs: [
                { k: 'Procesador', v: 'Intel Core i7-13700H — 14 nucleos' },
                { k: 'GPU', v: 'NVIDIA RTX 3050 — 4GB GDDR6' },
                { k: 'Memoria RAM', v: '16GB LPDDR5' },
                { k: 'Almacenamiento', v: '512GB SSD NVMe PCIe Gen4' },
                { k: 'Pantalla', v: '14" IPS QHD+ — 2560x1600 — 120Hz' },
                { k: 'Puertos', v: '2x Thunderbolt 4 · USB-A · HDMI 2.0 · SD' },
                { k: 'Conectividad', v: 'Wi-Fi 6E · Bluetooth 5.3' },
                { k: 'Bateria', v: '72Wh — Hasta 22 horas' },
                { k: 'Peso', v: '1.52 kg' }
            ] },
        { id: 3,  name: 'NovaBook Ultra X',        cat: 'laptops',     price: 1899, old: null,  specs: '32GB RAM · 1TB SSD · RTX 4060',         icon: 'laptop',          img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=400&fit=crop', rating: 4.7, reviews: 87,  badge: null,
            images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop'],
            desc: 'Potencia sin limites en un chassis de aluminio. La NovaBook Ultra X combina chip Intel i9 de 13a generacion con NVIDIA RTX 4060 para editar video 4K, renderizar 3D y correr los juegos mas exigentes sin despeinarse.',
            highlights: [
                { icon: 'cpu', title: 'Intel i9 13a gen', desc: '24 nucleos de potencia bruta' },
                { icon: 'gpu', title: 'RTX 4060', desc: 'Ray Tracing y DLSS 3 en tiempo real' },
                { icon: 'monitor', title: '4K OLED', desc: '16" HDR · 100% DCI-P3' },
                { icon: 'hard-drive', title: '1TB SSD', desc: 'NVMe Gen5 · 12GB/s lectura' }
            ],
            descSpecs: [
                { k: 'Procesador', v: 'Intel Core i9-13900H — 24 nucleos' },
                { k: 'GPU', v: 'NVIDIA RTX 4060 — 8GB GDDR6 — 115W' },
                { k: 'Memoria RAM', v: '32GB DDR5 5600MHz' },
                { k: 'Almacenamiento', v: '1TB SSD NVMe PCIe Gen5' },
                { k: 'Pantalla', v: '16" 4K OLED — 3840x2400 — 120Hz — HDR' },
                { k: 'Puertos', v: '2x Thunderbolt 4 · USB-A · HDMI 2.1 · SD · Ethernet' },
                { k: 'Conectividad', v: 'Wi-Fi 6E · Bluetooth 5.3' },
                { k: 'Bateria', v: '90Wh — Hasta 12 horas' },
                { k: 'Peso', v: '2.1 kg' }
            ] },
        { id: 4,  name: 'Zenith X12',              cat: 'smartphones', price: 799,  old: null,  specs: '128GB · Camara 50MP · 5G',              icon: 'smartphone',      img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop', rating: 4.6, reviews: 210, badge: null,
            images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&h=800&fit=crop'],
            desc: 'El smartphone que no Compromete. Camara de 50MP con procesamiento computacional, pantalla AMOLED 120Hz y 5G ultrarapido. El Zenith X12 te da calidad de camara profesional en tu bolsillo.',
            highlights: [
                { icon: 'camera', title: '50MP principal', desc: 'Procesamiento computacional avanzado' },
                { icon: 'signal', title: '5G ultrarapido', desc: 'Descargas y streaming sin limites' },
                { icon: 'battery-full', title: '5000mAh', desc: 'Bateria para todo el dia' },
                { icon: 'monitor', title: 'AMOLED 120Hz', desc: '6.7" FHD+ fluido y vibrante' }
            ],
            descSpecs: [
                { k: 'Pantalla', v: '6.7" AMOLED — 2400x1080 — 120Hz' },
                { k: 'Procesador', v: 'Snapdragon 8 Gen 2 — 8 nucleos' },
                { k: 'Memoria RAM', v: '8GB LPDDR5X' },
                { k: 'Almacenamiento', v: '128GB UFS 3.1' },
                { k: 'Camara principal', v: '50MP f/1.8 — OIS — PDAF' },
                { k: 'Camara ultra gran angular', v: '12MP f/2.2 — 120°' },
                { k: 'Bateria', v: '5000mAh — Carga rapida 67W' },
                { k: 'Conectividad', v: '5G · Wi-Fi 6E · Bluetooth 5.3' },
                { k: 'Peso', v: '198g' }
            ] },
        { id: 5,  name: 'Zenith X12 Mini',         cat: 'smartphones', price: 649,  old: 749,  specs: '128GB · Camara 48MP · Compacto',        icon: 'smartphone',      img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop', rating: 4.4, reviews: 156, badge: null,
            images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop'],
            desc: 'Todo el poder en tu palma. El Zenith X12 Mini ofrece camara de 48MP, pantalla compacta AMOLED y rendimiento fluido en un formato que cabe en cualquier bolsillo. Perfecto para quien no quiere renunciar a nada.',
            highlights: [
                { icon: 'camera', title: '48MP', desc: 'Camara nítida en formato compacto' },
                { icon: 'smartphone', title: 'Compacto', desc: '6.1" — comodo con una mano' },
                { icon: 'battery-full', title: '4500mAh', desc: 'Autonomia real para todo el dia' },
                { icon: 'zap', title: '45W rapida', desc: '50% en 20 minutos' }
            ],
            descSpecs: [
                { k: 'Pantalla', v: '6.1" AMOLED — 2400x1080 — 90Hz' },
                { k: 'Procesador', v: 'Snapdragon 7+ Gen 2' },
                { k: 'Memoria RAM', v: '8GB LPDDR5' },
                { k: 'Almacenamiento', v: '128GB UFS 3.1' },
                { k: 'Camara principal', v: '48MP f/1.7 — OIS' },
                { k: 'Camara frontal', v: '16MP f/2.4 — HDR' },
                { k: 'Bateria', v: '4500mAh — Carga rapida 45W' },
                { k: 'Conectividad', v: '5G · Wi-Fi 6 · Bluetooth 5.2' },
                { k: 'Peso', v: '175g' }
            ] },
        { id: 6,  name: 'Pulse Edge 5G',           cat: 'smartphones', price: 549,  old: null,  specs: '256GB · Camara 108MP · 5G',             icon: 'smartphone',      img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=400&fit=crop', rating: 4.3, reviews: 64,  badge: 'Nuevo',
            images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop'],
            desc: 'El nuevo estandar en gama media. Camara de 108MP que captura cada detalle, 256GB de almacenamiento y 5G para que no pares. El Pulse Edge 5G redefine lo que puedes esperar por este precio.',
            highlights: [
                { icon: 'camera', title: '108MP', desc: 'Resolucion premium sin premium price' },
                { icon: 'hard-drive', title: '256GB', desc: 'Espacio para todo tu contenido' },
                { icon: 'signal', title: '5G', desc: 'Velocidad de conexion de otra liga' },
                { icon: 'monitor', title: '90Hz', desc: 'Pantalla fluida para scroll y gaming' }
            ],
            descSpecs: [
                { k: 'Pantalla', v: '6.6" IPS — 2400x1080 — 90Hz' },
                { k: 'Procesador', v: 'MediaTek Dimensity 9200' },
                { k: 'Memoria RAM', v: '8GB LPDDR5' },
                { k: 'Almacenamiento', v: '256GB UFS 2.2' },
                { k: 'Camara principal', v: '108MP f/1.8 — PDAF' },
                { k: 'Camara macro', v: '2MP f/2.4' },
                { k: 'Bateria', v: '5200mAh — Carga rapida 33W' },
                { k: 'Conectividad', v: '5G · Wi-Fi 6 · Bluetooth 5.2' },
                { k: 'Peso', v: '188g' }
            ] },
        { id: 7,  name: 'AuroraBuds Pro',          cat: 'accesorios',  price: 149,  old: 199,  specs: 'Cancelacion de ruido · 30h bateria',    icon: 'headphones',      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop', rating: 4.7, reviews: 289, badge: null,
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=800&fit=crop'],
            desc: 'Sonido que te envuelve. Cancelacion de ruido activa con 6 microfonos, 30 horas de bateria total y codec LDAC para audio Hi-Res. Los AuroraBuds Pro te ponen en tu burbuja sonora perfecta.',
            highlights: [
                { icon: 'volume-x', title: 'ANC 6 mic', desc: 'Cancelacion de ruido adaptativa' },
                { icon: 'battery-full', title: '30h total', desc: '6h auriculares + 24h estuche' },
                { icon: 'music', title: 'Hi-Res', desc: 'LDAC · 24-bit · 96kHz' },
                { icon: 'droplets', title: 'IPX4', desc: 'Resistente a sudor y lluvia ligera' }
            ],
            descSpecs: [
                { k: 'Tipo', v: 'In-ear con ANC' },
                { k: 'Driver', v: '10mm dinamico — grafito' },
                { k: 'Frecuencia', v: '20Hz - 40kHz' },
                { k: 'Codecs', v: 'LDAC · AAC · SBC' },
                { k: 'ANC', v: '6 microfonos — modo transparencia' },
                { k: 'Bateria', v: '6h auriculares · 24h estuche · Carga USB-C' },
                { k: 'Conectividad', v: 'Bluetooth 5.3 · Multipunto' },
                { k: 'Resistencia', v: 'IPX4' },
                { k: 'Peso', v: '5.4g por auricular' }
            ] },
        { id: 8,  name: 'VoltCharge 65W GaN',      cat: 'accesorios',  price: 39,   old: null,  specs: 'Carga rapida · USB-C · GaN',            icon: 'plug-zap',        img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop', rating: 4.5, reviews: 412, badge: null,
            images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&h=800&fit=crop'],
            desc: 'Carga todo desde un solo cargador. Tecnologia GaN III lo hace 40% mas pequeno que los cargadores tradicionales pero entrega 65W puros para cargar laptop, tablet y telefono al mismo tiempo.',
            highlights: [
                { icon: 'zap', title: '65W GaN', desc: 'Tecnologia III — mas pequeno, mas potente' },
                { icon: 'usb', title: '3 puertos', desc: '2x USB-C + 1x USB-A' },
                { icon: 'shield', title: 'Proteccion', desc: 'Sobrevoltaje, sobrecorriente, cortocircuito' },
                { icon: 'globe', title: '100-240V', desc: 'Uso universal sin adaptador' }
            ],
            descSpecs: [
                { k: 'Potencia', v: '65W maximo' },
                { k: 'Puertos', v: 'USB-C 65W · USB-C 20W · USB-A 22.5W' },
                { k: 'Tecnologia', v: 'GaN III' },
                { k: 'Entrada', v: '100-240V ~ 50/60Hz 1.5A' },
                { k: 'Compatibilidad', v: 'PD 3.0 · QC 4.0 · PPS · SCP' },
                { k: 'Dimensiones', v: '42 x 42 x 32mm' },
                { k: 'Peso', v: '68g' }
            ] },
        { id: 9,  name: 'HyperKey Mechanical RGB', cat: 'accesorios',  price: 89,   old: null,  specs: 'Switches mecanicos · RGB · Anti-ghost',  icon: 'keyboard',        img: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=400&fit=crop', rating: 4.6, reviews: 133, badge: null,
            images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop'],
            desc: 'Cada tecla es una respuesta. Switches mecanicos hot-swap con 50 millones de ciclos, anti-ghosting NKRO completo y RGB por tecla para un setup que se siente tan bien como se ve.',
            highlights: [
                { icon: 'keyboard', title: 'Hot-swap', desc: 'Cambia switches sin soldar' },
                { icon: 'lightbulb', title: 'RGB por tecla', desc: '16.8M colores personalizables' },
                { icon: 'shield', title: 'NKRO', desc: 'Anti-ghosting completo' },
                { icon: 'cable', title: 'USB-C', desc: 'Cable desmontable y recambiable' }
            ],
            descSpecs: [
                { k: 'Tipo', v: 'Mecanico — Hot-swap 3/5 pines' },
                { k: 'Switches', v: 'Gateron Yellow Pro (preinstalados)' },
                { k: 'Anti-ghosting', v: 'NKRO completo' },
                { k: 'Backlight', v: 'RGB por tecla — 16.8M colores' },
                { k: 'Construccion', v: 'Aluminio + PBT Doubleshot' },
                { k: 'Conectividad', v: 'USB-C · Cable 1.8m desmontable' },
                { k: 'Dimensiones', v: '315 x 125 x 40mm' },
                { k: 'Peso', v: '780g' }
            ] },
        { id: 10, name: 'NexMouse Wireless Pro',   cat: 'accesorios',  price: 49,   old: 69,   specs: 'Inalambrico · 16000 DPI · RGB',         icon: 'mouse',           img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop', rating: 4.4, reviews: 178, badge: null,
            images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1615663245857-ac4c8e6c9307?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop'],
            desc: 'Precision quirurgica sin cables. Sensor optico de 16000 DPI, 1000Hz polling rate y 70 horas de bateria. El NexMouse Wireless Pro te da ventaja en gaming y productividad.',
            highlights: [
                { icon: 'crosshair', title: '16000 DPI', desc: 'Sensor optico de precision extrema' },
                { icon: 'wifi', title: 'Inalambrico', desc: '2.4GHz + Bluetooth 5.0' },
                { icon: 'battery-full', title: '70h', desc: 'Autonomia para semanas de uso' },
                { icon: 'palette', title: 'RGB', desc: 'Zonas de iluminacion personalizables' }
            ],
            descSpecs: [
                { k: 'Sensor', v: 'Optico — 16000 DPI — 400 IPS' },
                { k: 'Polling rate', v: '1000Hz' },
                { k: 'Conectividad', v: '2.4GHz dongle · Bluetooth 5.0 · USB-C' },
                { k: 'Bateria', v: '70h inalambrico · Carga USB-C' },
                { k: 'Botones', v: '7 programables' },
                { k: 'Forma', v: 'Ergonomica diestra' },
                { k: 'Peso', v: '78g' }
            ] },
        { id: 11, name: 'ArcadeX Controller Pro',  cat: 'gaming',      price: 69,   old: null,  specs: 'Inalambrico · Vibracion dual · USB-C',  icon: 'gamepad-2',       img: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600&h=400&fit=crop', rating: 4.8, reviews: 95,  badge: null,
            images: ['https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&h=800&fit=crop'],
            desc: 'Control profesional para gamers serios. Vibracion dual con HD Rumble, gatillos analicos con retroalimentacion y compatibilidad total con PC, Switch y movil. Cada accion se siente real.',
            highlights: [
                { icon: 'gamepad-2', title: 'HD Rumble', desc: 'Vibracion dual con feedback preciso' },
                { icon: 'wifi', title: 'Inalambrico', desc: 'Bluetooth 5.1 + 2.4GHz dongle' },
                { icon: 'battery-full', title: '40h', desc: 'Bateria para sesiones maraton' },
                { icon: 'smartphone', title: 'Multi-plataforma', desc: 'PC · Switch · Android · iOS' }
            ],
            descSpecs: [
                { k: 'Conectividad', v: 'Bluetooth 5.1 · 2.4GHz · USB-C' },
                { k: 'Gatillos', v: 'Analogicos con retroalimentacion' },
                { k: 'Vibracion', v: 'Dual motor — HD Rumble' },
                { k: 'Bateria', v: '40 horas — Carga USB-C' },
                { k: 'Compatibilidad', v: 'PC · Nintendo Switch · Android · iOS' },
                { k: 'Peso', v: '220g' }
            ] },
        { id: 12, name: 'PixelView 27" 165Hz',     cat: 'gaming',      price: 329,  old: 399,  specs: '165Hz · 1ms · IPS QHD',                 icon: 'monitor',         img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop', rating: 4.9, reviews: 267, badge: 'Top ventas',
            images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1616353071855-2c13a4c60e6c?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop'],
            desc: 'Cada frame cuenta. Panel IPS QHD a 165Hz con 1ms de respuesta, FreeSync Premium y 99% sRGB. El PixelView 27 te da la ventaja visual que necesitas para competir al mas alto nivel.',
            highlights: [
                { icon: 'monitor', title: '165Hz QHD', desc: '2560x1440 — fluido y nítido' },
                { icon: 'zap', title: '1ms', desc: 'Respuesta sin ghosting' },
                { icon: 'eye', title: 'FreeSync', desc: 'Elimina tearing y stuttering' },
                { icon: 'palette', title: '99% sRGB', desc: 'Colores precisos para gaming y diseño' }
            ],
            descSpecs: [
                { k: 'Panel', v: 'IPS — 27" — QHD 2560x1440' },
                { k: 'Frecuencia', v: '165Hz — FreeSync Premium' },
                { k: 'Respuesta', v: '1ms GTG' },
                { k: 'Brillo', v: '350 nits' },
                { k: 'Color', v: '99% sRGB — 95% DCI-P3' },
                { k: 'Puertos', v: 'HDMI 2.1 x2 · DisplayPort 1.4 · USB-C' },
                { k: 'Altura ajustable', v: 'Si — 120mm' },
                { k: 'Peso', v: '6.2kg' }
            ] },
        { id: 13, name: 'QuantumConsole One',      cat: 'gaming',      price: 499,  old: null,  specs: '4K · 1TB SSD · Ray Tracing',            icon: 'monitor',         img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop', rating: 4.7, reviews: 121, badge: null,
            images: ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&h=800&fit=crop'],
            desc: 'Gaming en 4K nativo con Ray Tracing real. La QuantumConsole One lleva la experiencia de consola al siguiente nivel con SSD de 1TB ultrarapido, 16GB GDDR6 y soporte para 120fps en 4K. Sin tiempos de carga, sin limites.',
            highlights: [
                { icon: 'monitor', title: '4K 120fps', desc: 'Gaming nativo en ultra' },
                { icon: 'hard-drive', title: '1TB SSD', desc: 'Carga de juegos en segundos' },
                { icon: 'sparkles', title: 'Ray Tracing', desc: 'Reflejos y sombras realistas' },
                { icon: 'gamepad-2', title: '16GB GDDR6', desc: 'Memoria dedicada de video' }
            ],
            descSpecs: [
                { k: 'GPU', v: 'RDNA 3 custom — 16GB GDDR6' },
                { k: 'CPU', v: 'Zen 5 custom — 8 nucleos — 4.2GHz' },
                { k: 'Almacenamiento', v: '1TB SSD NVMe custom' },
                { k: 'RAM', v: '16GB GDDR6 unificada' },
                { k: 'Resolucion', v: '4K nativo · 120fps · 8K upscaling' },
                { k: 'Ray Tracing', v: 'Hardware dedicado' },
                { k: 'Puertos', v: 'HDMI 2.1 · USB-A x3 · USB-C · Ethernet' },
                { k: 'Conectividad', v: 'Wi-Fi 6E · Bluetooth 5.2' },
                { k: 'Peso', v: '3.8kg' }
            ] },
        { id: 14, name: 'NovaPad 11 Pro',           cat: 'tablets',     price: 549,  old: null,  specs: '11" OLED · 256GB · Stylus',             icon: 'tablet',         img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop', rating: 4.6, reviews: 94,  badge: 'Nuevo',
            images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1589739900243-4b52cd9b1765?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1632631244952-318619c53273?w=800&h=800&fit=crop'],
            desc: 'Productividad y creatividad en pantalla OLED de 11 pulgadas. La NovaPad 11 Pro incluye stylus magnetico, soporte para teclado y chip M1 para renders rapidos y multitarea sin lag.',
            highlights: [
                { icon: 'pen-tool', title: 'Stylus magnetico', desc: 'Precision al nivel del pixel' },
                { icon: 'monitor', title: 'OLED 120Hz', desc: '11" HDR · colores vibrantes' },
                { icon: 'cpu', title: 'Chip M1', desc: 'Rendimiento de escritorio' },
                { icon: 'battery-full', title: '15h bateria', desc: 'Todo el dia creando' }
            ],
            descSpecs: [
                { k: 'Pantalla', v: '11" OLED — 2388x1668 — 120Hz — P3 wide color' },
                { k: 'Procesador', v: 'Apple M1 — 8 nucleos' },
                { k: 'Memoria RAM', v: '8GB LPDDR4X' },
                { k: 'Almacenamiento', v: '256GB SSD' },
                { k: 'Camara', v: '12MP Wide · 10MP Ultra Wide · LiDAR' },
                { k: 'Puertos', v: 'USB-C · MagSafe 3' },
                { k: 'Conectividad', v: 'Wi-Fi 6E · Bluetooth 5.3 · 5G (opcional)' },
                { k: 'Peso', v: '466g' }
            ] },
        { id: 15, name: 'NovaPad Mini',              cat: 'tablets',     price: 329,  old: 379,  specs: '10.9" LCD · 128GB · Compacta',          icon: 'tablet',         img: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600&h=400&fit=crop', rating: 4.4, reviews: 187, badge: null,
            images: ['https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1632631244952-318619c53273?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1589739900243-4b52cd9b1765?w=800&h=800&fit=crop'],
            desc: 'Compacta, ligera y potente. La NovaPad Mini es perfecta para leer, navegar y consumir contenido en cualquier lugar. Pantalla de 10.9" con colores nítidos y autonomia de 10 horas.',
            highlights: [
                { icon: 'monitor', title: '10.9" LCD', desc: 'Pantalla nítida y brillante' },
                { icon: 'battery-full', title: '10h bateria', desc: 'Lectura y streaming sin pausa' },
                { icon: 'weight', title: '478g', desc: 'Ultra ligera para llevar siempre' },
                { icon: 'camera', title: '8MP', desc: 'Para fotos y escaneo de documentos' }
            ],
            descSpecs: [
                { k: 'Pantalla', v: '10.9" Liquid Retina — 2360x1640 — 60Hz' },
                { k: 'Procesador', v: 'A14 Bionic' },
                { k: 'Memoria RAM', v: '4GB' },
                { k: 'Almacenamiento', v: '128GB' },
                { k: 'Camara', v: '8MP Wide · FaceTime HD 12MP frontal' },
                { k: 'Puertos', v: 'USB-C' },
                { k: 'Conectividad', v: 'Wi-Fi 6 · Bluetooth 5.2' },
                { k: 'Peso', v: '478g' }
            ] },
        { id: 16, name: 'LuminaHub Smart Hub',       cat: 'smart-home',  price: 89,   old: null,  specs: 'Zigbee · Matter · Pantalla 7"',         icon: 'wifi',           img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop', rating: 4.5, reviews: 156, badge: 'Nuevo',
            images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&h=800&fit=crop'],
            desc: 'El cerebro de tu hogar inteligente. LuminaHub conecta hasta 200 dispositivos Zigbee y Matter, con pantalla tactil de 7 pulgadas para controlar luces, climas y cerraduras con la voz o al tacto.',
            highlights: [
                { icon: 'wifi', title: 'Matter + Zigbee', desc: 'Compatible con todo' },
                { icon: 'monitor', title: 'Pantalla 7"', desc: 'Tactil con widgets de clima y control' },
                { icon: 'mic', title: 'Asistente de voz', desc: 'Escucha y responde en espanol' },
                { icon: 'cpu', title: '200 dispositivos', desc: 'Sin congestion ni lag' }
            ],
            descSpecs: [
                { k: 'Pantalla', v: '7" IPS — 1024x600 — tactil capacitiva' },
                { k: 'Procesador', v: 'Quad-core 1.8GHz' },
                { k: 'Conectividad', v: 'Wi-Fi 6 · Bluetooth 5.3 · Zigbee 3.0 · Thread' },
                { k: 'Compatibilidad', v: 'Matter · Apple HomeKit · Google Home · Alexa' },
                { k: 'Altavoz', v: '5W full range' },
                { k: 'Puertos', v: 'Ethernet · USB-C · USB-A' },
                { k: 'Alimentacion', v: 'Cable USB-C 12V/2A' },
                { k: 'Peso', v: '350g' }
            ] },
        { id: 17, name: 'LuminaCam 2K',              cat: 'smart-home',  price: 49,   old: 69,   specs: '2K · Visibilidad nocturna · IA',        icon: 'camera',         img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', rating: 4.7, reviews: 312, badge: null,
            images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop'],
            desc: 'Seguridad inteligente con vision nocturna a color. La LuminaCam 2K detecta personas, mascotas y paquetes con IA, envia alertas instantaneas a tu telefono y graba 24/7 en la nube.',
            highlights: [
                { icon: 'eye', title: 'Visión nocturna', desc: 'Color en completa oscuridad' },
                { icon: 'brain', title: 'IA integrada', desc: 'Detecta personas vs mascotas' },
                { icon: 'cloud', title: 'Nube 24/7', desc: 'Grabacion continua con 30 dias gratis' },
                { icon: 'shield', title: 'Dos factores', desc: 'Encriptacion E2E de extremo a extremo' }
            ],
            descSpecs: [
                { k: 'Resolucion', v: '2K QHD — 2560x1440' },
                { k: 'Campo de vision', v: '130° diagonal' },
                { k: 'Visión nocturna', v: 'A color — 10m de alcance' },
                { k: 'IA', v: 'Deteccion de personas, mascotas, paquetes' },
                { k: 'Audio', v: 'Altavoz 2W · Microfono bidireccional con reduccion de ruido' },
                { k: 'Almacenamiento', v: 'MicroSD hasta 256GB · Nube con suscripcion' },
                { k: 'Conectividad', v: 'Wi-Fi 6 · Bluetooth 5.0' },
                { k: 'Resistencia', v: 'IP66 — polvo y lluvia' }
            ] },
        { id: 18, name: 'LuminaSwitch Pro',          cat: 'smart-home',  price: 29,   old: null,  specs: 'Matter · WiFi · Panel tactil',           icon: 'toggle-right',   img: 'https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?w=600&h=400&fit=crop', rating: 4.3, reviews: 89,  badge: null,
            images: ['https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&h=800&fit=crop'],
            desc: 'Interruptor inteligente con panel tactil retroiluminado. Controla luces, ventiladores y reguladores de energia desde el muro, tu telefono o por voz. Compatible con Matter sin hub adicional.',
            highlights: [
                { icon: 'toggle-right', title: '3 circuitos', desc: 'Controla hasta 3 luces independientes' },
                { icon: 'wifi', title: 'Matter directo', desc: 'Sin hub necesario' },
                { icon: 'moon', title: 'Regulable', desc: 'Brillo dimmable del 1% al 100%' },
                { icon: 'zap', title: 'Instalacion', desc: 'Reemplaza el switch existente en 10 min' }
            ],
            descSpecs: [
                { k: 'Circuitos', v: '3 independientes — 200W c/u LED' },
                { k: 'Conectividad', v: 'Wi-Fi 2.4GHz · Thread · Bluetooth' },
                { k: 'Compatibilidad', v: 'Matter · Apple HomeKit · Google Home · Alexa' },
                { k: 'Panel', v: 'Tactil capacitivo con retroiluminacion LED' },
                { k: 'Voltaje', v: '110V-240V AC' },
                { k: 'Tamaño', v: 'Estándar US — encaja en caja existente' },
                { k: 'Material', v: 'Cristal templado + policarbonato' },
                { k: 'Peso', v: '120g' }
            ] }
    ];

    /* =====================================================
       STATE
       ===================================================== */
    var state = {
        cart: (function () {
            try { return JSON.parse(localStorage.getItem('techstore_cart') || '[]'); }
            catch (e) { return []; }
        })(),
        activeCategory: 'todos'
    };

    function saveCart() {
        try { localStorage.setItem('techstore_cart', JSON.stringify(state.cart)); }
        catch (e) { /* quota exceeded — silent */ }
    }

    /* =====================================================
       UTILS
       ===================================================== */
    function esc(str) {
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(str));
        return d.innerHTML;
    }
    function money(n) { return '$' + n.toLocaleString('en-US'); }
    function findProduct(id) { return PRODUCTS.find(function (p) { return p.id === id; }); }
    function calcDiscount(price, old) { return old ? Math.round((1 - price / old) * 100) : 0; }

    function stars(rating) {
        var full = Math.floor(rating);
        var half = rating % 1 >= 0.5 ? 1 : 0;
        var s = '';
        for (var i = 0; i < full; i++) s += '<i data-lucide="star" class="star-icon star-icon--fill"></i>';
        if (half) s += '<i data-lucide="star-half" class="star-icon star-icon--fill"></i>';
        for (var j = full + half; j < 5; j++) s += '<i data-lucide="star" class="star-icon"></i>';
        return s;
    }

    /* =====================================================
       TOAST
       ===================================================== */
    function showToast(typeOrMsg, title, message) {
        if (window.showToast && window.showToast !== showToast) {
            window.showToast(typeOrMsg, title, message);
            return;
        }
        var type = title ? typeOrMsg : 'success';
        var msg = title || typeOrMsg;
        var container = document.getElementById('toastContainer');
        if (!container) return;
        var iconMap = { success: 'circle-check', error: 'circle-x', info: 'info', warning: 'alert-triangle' };
        var toast = document.createElement('div');
        toast.className = 'toast toast--' + type;
        toast.innerHTML = '<div class="toast__icon"><i data-lucide="' + (iconMap[type] || 'circle-check') + '"></i></div>' +
            '<div class="toast__content"><div class="toast__title">' + esc(msg) + '</div>' +
            (message ? '<div class="toast__message">' + esc(message) + '</div>' : '') + '</div>' +
            '<button class="toast__close" aria-label="Cerrar notificacion"><i data-lucide="x"></i></button>' +
            '<div class="toast__progress"></div>';
        container.appendChild(toast);
        if (window.lucide) lucide.createIcons();
        function dismiss() {
            toast.classList.add('toast--exit');
            setTimeout(function () {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }
        toast.querySelector('.toast__close').addEventListener('click', dismiss);
        setTimeout(dismiss, 3000);
    }

    /* =====================================================
       RENDER — Categorias (Bento for landing)
       ===================================================== */
    function renderCategories() {
        var bento = document.getElementById('featuredBento');
        if (!bento) return;
        bento.innerHTML = CATEGORIES.map(function (c, i) {
            return '<div class="bento-card' + (i === 0 ? ' bento-featured' : '') + '" data-category="' + c.key + '" role="button" tabindex="0">' +
                '<div class="bento-card__bg"><img class="bento-card__image" src="' + esc(c.img) + '" alt="' + esc(c.label) + '" loading="lazy"></div>' +
                '<div class="bento-card__content">' +
                    '<div class="bento-card__arrow"><i data-lucide="arrow-up-right"></i></div>' +
                    '<div class="bento-card__icon"><i data-lucide="' + c.icon + '"></i></div>' +
                    '<h3>' + esc(c.label) + '</h3>' +
                    '<div class="bento-card__meta"><span>' + esc(c.meta) + '</span></div>' +
                '</div>' +
            '</div>';
        }).join('');
        if (window.lucide) lucide.createIcons();
        bento.querySelectorAll('.bento-card').forEach(function (card) {
            function go() {
                window.location.href = 'tienda.html?cat=' + card.dataset.category;
            }
            card.addEventListener('click', go);
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    go();
                }
            });
        });
    }

    function renderFilterBar() {
        var bar = document.getElementById('filterBar');
        if (!bar) return;
        var icons = { todos: 'grid-3x3', laptops: 'laptop', smartphones: 'smartphone', accesorios: 'headphones', gaming: 'gamepad-2' };
        var filters = [{ key: 'todos', name: 'Todos', icon: 'grid-3x3' }].concat(CATEGORIES.map(function (c) {
            return { key: c.key, name: c.label, icon: icons[c.key] || 'tag' };
        }));
        bar.innerHTML = filters.map(function (f) {
            return '<button class="filter-btn' + (f.key === state.activeCategory ? ' filter-btn--active' : '') +
                '" data-category="' + f.key + '">' +
                '<i data-lucide="' + f.icon + '"></i>' +
                '<span>' + f.name + '</span>' +
                '</button>';
        }).join('');
        bar.querySelectorAll('.filter-btn').forEach(function (btn) {
            btn.addEventListener('click', function () { setActiveCategory(btn.dataset.category); });
        });
    }

    function setActiveCategory(cat) {
        state.activeCategory = cat;
        renderFilterBar();
        renderProducts();
    }

    /* =====================================================
       RENDER — Productos
       ===================================================== */
    function productCardHTML(p) {
        var discount = calcDiscount(p.price, p.old);
        var badgeHTML = '';
        if (discount) {
            badgeHTML = '<span class="product-card__discount">-' + discount + '%</span>';
        } else if (p.badge) {
            badgeHTML = '<span class="product-card__badge">' + esc(p.badge) + '</span>';
        }

        return '<article class="product-card" data-id="' + p.id + '" data-cat="' + p.cat + '" style="cursor:pointer">' +
            '<div class="product-card__media">' +
                '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy">' +
                badgeHTML +
                '<button class="product-card__add" data-id="' + p.id + '" aria-label="Agregar ' + esc(p.name) + ' al carrito"><i data-lucide="plus"></i></button>' +
            '</div>' +
            '<div class="product-card__body">' +
                '<div class="product-card__top">' +
                    '<h3>' + esc(p.name) + '</h3>' +
                    '<div class="product-card__price">' +
                        (p.old ? '<span class="product-card__price-old">' + money(p.old) + '</span>' : '') +
                        '<span class="product-card__price-current">' + money(p.price) + '</span>' +
                    '</div>' +
                '</div>' +
                '<p class="product-card__specs">' + esc(p.specs) + '</p>' +
            '</div>' +
        '</article>';
    }

    function renderProducts() {
        var grid = document.getElementById('productsGrid');
        if (!grid) return;
        var list = state.activeCategory === 'todos'
            ? PRODUCTS
            : PRODUCTS.filter(function (p) { return p.cat === state.activeCategory; });
        grid.innerHTML = list.map(productCardHTML).join('');
        bindAddButtons(grid);
        bindCardNavigation(grid);
        if (window.lucide) lucide.createIcons();
    }

    function renderFeaturedProducts() {
        var grid = document.getElementById('featuredProducts');
        if (!grid) return;
        var featured = PRODUCTS.filter(function (p) { return p.badge || p.old; }).slice(0, 4);
        if (featured.length < 4) featured = PRODUCTS.slice(0, 4);
        grid.innerHTML = featured.map(productCardHTML).join('');
        bindAddButtons(grid);
        bindCardNavigation(grid);
        if (window.lucide) lucide.createIcons();
    }

    function renderOffers() {
        var grid = document.getElementById('offersGrid');
        if (!grid) return;
        var list = PRODUCTS.filter(function (p) { return p.old; });
        grid.innerHTML = list.map(productCardHTML).join('');
        bindAddButtons(grid);
        bindCardNavigation(grid);
        if (window.lucide) lucide.createIcons();
    }

    function bindAddButtons(scope) {
        scope.querySelectorAll('.product-card__add').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                addToCart(parseInt(btn.dataset.id, 10));
                btn.classList.remove('bumped');
                void btn.offsetWidth;
                btn.classList.add('bumped');
            });
        });
    }

    function bindCardNavigation(scope) {
        scope.querySelectorAll('.product-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var id = card.dataset.id;
                if (id) window.location.href = 'producto.html?id=' + id;
            });
        });
    }

    /* =====================================================
       CART — Logica
       ===================================================== */
    function addToCart(id, qty) {
        id = parseInt(id, 10);
        if (isNaN(id)) return;
        qty = parseInt(qty, 10) || 1;
        var item = state.cart.find(function (c) { return c.id === id; });
        if (item) { item.qty += qty; } else { state.cart.push({ id: id, qty: qty }); }
        saveCart();
        renderCart();
        var p = findProduct(id);
        if (p) showToast(p.name + ' agregado al carrito');
    }

    function removeFromCart(id) {
        state.cart = state.cart.filter(function (c) { return c.id !== id; });
        saveCart();
        renderCart();
    }

    function updateQty(id, qty) {
        if (qty < 1) { removeFromCart(id); return; }
        var item = state.cart.find(function (c) { return c.id === id; });
        if (item) { item.qty = qty; }
        saveCart();
        renderCart();
    }

    function cartTotal() {
        return state.cart.reduce(function (sum, c) {
            var p = findProduct(c.id);
            return sum + (p ? p.price * c.qty : 0);
        }, 0);
    }

    function renderCart() {
        var container = document.getElementById('cartItems');
        var countEl = document.getElementById('cartCount');
        var totalEl = document.getElementById('cartTotal');
        var checkoutBtnEl = document.getElementById('checkoutBtn');
        if (!container) return;
        var totalQty = state.cart.reduce(function (s, c) { return s + c.qty; }, 0);

        if (countEl) {
            countEl.textContent = totalQty;
            countEl.style.display = totalQty === 0 ? 'none' : 'flex';
        }
        if (totalEl) totalEl.textContent = money(cartTotal());
        if (checkoutBtnEl) checkoutBtnEl.disabled = state.cart.length === 0;

        if (state.cart.length === 0) {
            container.innerHTML = '<div class="cart-empty">' +
                '<i data-lucide="shopping-cart"></i>' +
                '<p>Tu carrito esta vacio.<br>Explora el catalogo y agrega tus productos favoritos.</p>' +
            '</div>';
            if (window.lucide) lucide.createIcons();
            return;
        }

        container.innerHTML = state.cart.map(function (c) {
            var p = findProduct(c.id);
            if (!p) return '';
            return '<div class="cart-item" data-id="' + p.id + '">' +
                '<div class="cart-item__media">' + (p.img ? '<img src="' + esc(p.img) + '" alt="">' : '<i data-lucide="' + p.icon + '"></i>') + '</div>' +
                '<div class="cart-item__info">' +
                    '<h4>' + p.name + '</h4>' +
                    '<div class="cart-item__price">' + money(p.price) + '</div>' +
                    '<div class="cart-item__qty">' +
                        '<button class="qty-minus" aria-label="Disminuir">-</button>' +
                        '<span>' + c.qty + '</span>' +
                        '<button class="qty-plus" aria-label="Aumentar">+</button>' +
                    '</div>' +
                '</div>' +
                '<button class="cart-item__remove" aria-label="Eliminar ' + p.name + '"><i data-lucide="trash-2"></i></button>' +
            '</div>';
        }).join('');
        if (window.lucide) lucide.createIcons();

        container.querySelectorAll('.cart-item').forEach(function (row) {
            var id = parseInt(row.dataset.id, 10);
            row.querySelector('.qty-minus').addEventListener('click', function () {
                var item = state.cart.find(function (c) { return c.id === id; });
                if (item) updateQty(id, item.qty - 1);
            });
            row.querySelector('.qty-plus').addEventListener('click', function () {
                var item = state.cart.find(function (c) { return c.id === id; });
                if (item) updateQty(id, item.qty + 1);
            });
            row.querySelector('.cart-item__remove').addEventListener('click', function () { removeFromCart(id); });
        });
    }

    /* =====================================================
       CART — Drawer
       ===================================================== */
    function openCart(open) {
        var drawer = document.getElementById('cartDrawer');
        var overlay = document.getElementById('cartOverlay');
        var mobileNav = document.getElementById('mobileNav');
        if (drawer) { drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', String(!open)); }
        if (overlay) overlay.classList.toggle('open', open);
        var mobileNavOpen = mobileNav && mobileNav.classList.contains('active');
        if (!open && mobileNavOpen) {
            document.body.style.overflow = 'hidden';
        } else if (!open) {
            document.body.style.overflow = '';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    /* =====================================================
       CHECKOUT
       ===================================================== */
    function checkout() {
        if (state.cart.length === 0) return;
        openCart(false);
        window.location.href = 'checkout.html';
    }

    /* Prevent double-binding on checkout page */
    function isCheckoutPage() {
        return !!document.getElementById('checkoutGrid');
    }

    /* =====================================================
       COUNTDOWN
       ===================================================== */
    function startCountdown() {
        var total = 6 * 3600;
        var h = document.getElementById('cd-h');
        var m = document.getElementById('cd-m');
        var s = document.getElementById('cd-s');
        if (!h || !m || !s) return;
        function tick() {
            if (total <= 0) total = 6 * 3600;
            var hh = Math.floor(total / 3600);
            var mm = Math.floor((total % 3600) / 60);
            var ss = total % 60;
            h.textContent = String(hh).padStart(2, '0');
            m.textContent = String(mm).padStart(2, '0');
            s.textContent = String(ss).padStart(2, '0');
            total--;
        }
        tick();
        setInterval(tick, 1000);
    }

    /* =====================================================
       CONTACT FORM
       ===================================================== */
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;
            var name = document.getElementById('cf-name');
            var email = document.getElementById('cf-email');
            var message = document.getElementById('cf-message');
            var errName = document.getElementById('err-name');
            var errEmail = document.getElementById('err-email');
            var errMessage = document.getElementById('err-message');
            var formSuccess = document.getElementById('formSuccess');

            if (errName) errName.textContent = '';
            if (errEmail) errEmail.textContent = '';
            if (errMessage) errMessage.textContent = '';

            if (name && !name.value.trim()) { if (errName) errName.textContent = 'Ingresa tu nombre.'; valid = false; }
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { if (errEmail) errEmail.textContent = 'Ingresa un correo valido.'; valid = false; }
            if (message && !message.value.trim()) { if (errMessage) errMessage.textContent = 'Escribe tu mensaje.'; valid = false; }

            if (!valid) return;

            if (formSuccess) formSuccess.classList.add('show');
            form.reset();
            setTimeout(function () { if (formSuccess) formSuccess.classList.remove('show'); }, 4000);
        });
    }

    /* =====================================================
       MOBILE NAV
       ===================================================== */
    function initMobileNav() {
        var menuBtn = document.getElementById('menuBtn');
        var mobileNav = document.getElementById('mobileNav');
        var overlay = document.getElementById('mobileNavOverlay');
        var closeBtn = document.getElementById('mobileNavClose');
        if (!menuBtn || !mobileNav) return;

        function open() {
            mobileNav.classList.add('active');
            menuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function close() {
            mobileNav.classList.remove('active');
            menuBtn.classList.remove('active');
            var cartOpen = document.getElementById('cartDrawer') && document.getElementById('cartDrawer').classList.contains('open');
            if (!cartOpen) document.body.style.overflow = '';
        }

        menuBtn.addEventListener('click', function () {
            mobileNav.classList.contains('active') ? close() : open();
        });
        if (overlay) overlay.addEventListener('click', close);
        if (closeBtn) closeBtn.addEventListener('click', close);

        mobileNav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', close);
        });
    }

    /* =====================================================
       HEADER SCROLL
       ===================================================== */
    function initHeaderScroll() {
        var header = document.getElementById('header');
        if (!header) return;
        var ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    header.classList.toggle('scrolled', window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* =====================================================
       SEARCH
       ===================================================== */
    function initSearch() {
        var input = document.getElementById('searchInput');
        if (!input) return;
        function doSearch() {
            var raw = input.value.trim();
            var q = raw.toLowerCase();
            if (!q) return;
            if (!document.getElementById('productsGrid')) {
                window.location.href = 'tienda.html?q=' + encodeURIComponent(raw);
                return;
            }
            state.activeCategory = 'todos';
            renderFilterBar();
            var grid = document.getElementById('productsGrid');
            var list = PRODUCTS.filter(function (p) {
                return p.name.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q) || p.cat.includes(q);
            });
            grid.innerHTML = list.length ? list.map(productCardHTML).join('') : emptySearchHTML(raw);
            bindAddButtons(grid);
            bindCardNavigation(grid);
            if (window.lucide) lucide.createIcons();
            grid.scrollIntoView({ behavior: 'smooth' });
        }
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSearch(); });
        var searchBtn = input.parentElement.querySelector('.header__search-btn');
        if (searchBtn) searchBtn.addEventListener('click', doSearch);
    }

    function initHomeSearch() {
        var input = document.getElementById('homeSearchInput');
        var btn = document.getElementById('homeSearchBtn');
        if (!input || !btn) return;
        function go() {
            var raw = input.value.trim();
            window.location.href = raw ? 'tienda.html?q=' + encodeURIComponent(raw) : 'tienda.html';
        }
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
        btn.addEventListener('click', go);
    }

    function emptySearchHTML(term) {
        return '<div class="empty-state">' +
            '<div class="empty-state__icon"><i data-lucide="search-x"></i></div>' +
            '<h3>No encontramos "' + esc(term) + '"</h3>' +
            '<p>Prueba con laptop, audifonos, monitor, smartphone o gaming.</p>' +
            '<a href="tienda.html" class="btn btn--ghost">Ver catalogo completo</a>' +
        '</div>';
    }

    /* =====================================================
       SCROLL REVEAL
       ===================================================== */
    function initReveal() {
        var els = document.querySelectorAll('.reveal');
        if (!els.length) return;
        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('visible'); });
            return;
        }
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
        els.forEach(function (el) { obs.observe(el); });
    }

    /* =====================================================
       INIT
       ===================================================== */
    function init() {
        var yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        if (document.getElementById('featuredBento')) renderCategories();
        if (document.getElementById('filterBar')) renderFilterBar();
        if (document.getElementById('productsGrid')) renderProducts();
        if (document.getElementById('featuredProducts')) renderFeaturedProducts();
        if (document.getElementById('offersGrid')) renderOffers();
        renderCart();
        if (document.getElementById('countdown')) startCountdown();
        if (document.getElementById('contactForm')) initContactForm();
        initMobileNav();
        initHeaderScroll();
        if (document.getElementById('searchInput')) initSearch();
        initHomeSearch();
        initReveal();

        var searchToggle = document.getElementById('searchToggle');
        var searchBox = document.querySelector('.header__search');
        if (searchToggle && searchBox) {
            searchToggle.addEventListener('click', function () {
                searchBox.classList.toggle('open');
                if (searchBox.classList.contains('open')) {
                    var input = searchBox.querySelector('input');
                    if (input) input.focus();
                }
            });
            document.addEventListener('click', function (e) {
                if (!searchBox.contains(e.target) && e.target !== searchToggle && !searchToggle.contains(e.target)) {
                    searchBox.classList.remove('open');
                }
            });
        }

        var cartBtn = document.getElementById('cartBtn');
        var cartClose = document.getElementById('cartClose');
        var cartOverlay = document.getElementById('cartOverlay');
        var checkoutBtnEl = document.getElementById('checkoutBtn');
        var orderModalClose = document.getElementById('orderModalClose');

        if (cartBtn) cartBtn.addEventListener('click', function () { openCart(true); });
        if (cartClose) cartClose.addEventListener('click', function () { openCart(false); });
        if (cartOverlay) cartOverlay.addEventListener('click', function () { openCart(false); });
        if (checkoutBtnEl && !isCheckoutPage()) checkoutBtnEl.addEventListener('click', checkout);
        if (orderModalClose) orderModalClose.addEventListener('click', function () {
            var om = document.getElementById('orderModal');
            if (om) om.classList.remove('open');
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                openCart(false);
                var om = document.getElementById('orderModal');
                if (om) om.classList.remove('open');
            }
        });

        var params = new URLSearchParams(window.location.search);
        var catParam = params.get('cat');
        if (catParam && document.getElementById('filterBar')) {
            setActiveCategory(catParam);
        }
        var qParam = params.get('q');
        if (qParam && document.getElementById('productsGrid')) {
            var si = document.getElementById('searchInput');
            if (si) si.value = qParam;
            state.activeCategory = 'todos';
            renderFilterBar();
            var qGrid = document.getElementById('productsGrid');
            var ql = qParam.toLowerCase();
            var qList = PRODUCTS.filter(function (p) {
                return p.name.toLowerCase().includes(ql) || p.specs.toLowerCase().includes(ql) || p.cat.includes(ql);
            });
            qGrid.innerHTML = qList.length ? qList.map(productCardHTML).join('') : emptySearchHTML(qParam);
            bindAddButtons(qGrid);
            bindCardNavigation(qGrid);
            if (window.lucide) lucide.createIcons();
        }
    }

    /* =====================================================
       EXPORT — For product detail page
       ===================================================== */
    window.TechStore = {
        PRODUCTS: PRODUCTS,
        CATEGORIES: CATEGORIES,
        money: money,
        stars: stars,
        esc: esc,
        addToCart: addToCart,
        saveCart: saveCart,
        getCart: function () { return state.cart.map(function(c) { return {id: c.id, qty: c.qty}; }); },
        showToast: showToast
    };
    window.showToast = window.showToast || showToast;

    document.addEventListener('DOMContentLoaded', init);
})();
