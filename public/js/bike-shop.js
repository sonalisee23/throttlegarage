// Bike Parts Data
const bikePartsData = {
    '1': { // BMW S1000RR
        name: 'BMW S1000RR',
        image: 'https://images.unsplash.com/photo-1635073943225-77faca64a381?auto=format&fit=crop&w=800&h=500',
        specs: {
            engine: '999cc',
            power: '205 HP',
            year: '2023'
        },
        parts: [
            {
                id: 'bmw-exhaust-1',
                name: 'Akrapovic Exhaust System',
                price: 1299.99,
                image: 'https://th.bing.com/th/id/OIP.uSVSHVa__4QOPSGQPZiUkAHaFF?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3',
                description: 'Full titanium exhaust system with a carbon fiber end cap designed to reduce weight, enhance exhaust flow, and deliver a deep, aggressive sound. Boosts horsepower and improves throttle response.',
                features: [
                    'Full titanium construction',
                    'Carbon fiber end cap',
                    'Deep, aggressive exhaust note',
                    'Weight reduction',
                    'Improved throttle response'
                ]
            },
            {
                id: 'bmw-ecu-1',
                name: 'ECU Flash',
                price: 499.99,
                image: 'https://www.woolichracing.co.uk/images/products/woolich-racing-bmw-harness-type-3.png',
                description: 'High-performance ECU flash that recalibrates fuel maps, ignition timing, and throttle response. Includes dyno tuning for maximum gains in power and smoothness.',
                features: [
                    'Custom fuel and Custom tuning for your setup mapping',
                    'Improved throttle response',
                    'Increased horsepower and torque',
                    'Dyno-tuned for your bike',
                    'Optimized for performance exhausts'
                ]
            },
            {
                id: 'bmw-brake-1',
                name: 'Brembo Brake Kit',
                price: 899.99,
                image: 'https://www.motomillion.com/cdn/shop/products/Brembo_208973767_Racing_SuperSport_Rotor_Left_Right_Rotors_Set_BMW_S1000RR_K67_2019_2020_grande.jpg?v=1574714461',
                description: 'Complete front brake upgrade from Brembo, offering superior stopping power, reduced fade, and increased confidence under hard braking.',
                features: [
                    'High-performance calipers',
                    'Improved braking power',
                    'Heat-resistant rotors',
                    'Enhanced safety',
                    'Easy installation'
                ]
            },
            {
                id: 'bmw-airfilter-1',
                name: 'Performance Air Filter',
                price: 4999,
                image: 'https://m.media-amazon.com/images/I/51uzaxRTHtL._AC_.jpg',
                description: 'High-flow performance air filter for maximum airflow and engine protection',
                category: 'Air Filter',
                features: [
                    'High-flow filtration',
                    'Reusable and washable',
                    'Improved engine protection',
                    'Enhanced airflow',
                    'Easy to install'
                ]
            },
            {
                id: 'bmw-fairing-1',
                name: 'Carbon Fiber Fairing Kit',
                price: 14999,
                image: 'https://cdn11.bigcommerce.com/s-v1n9xyfp1h/images/stencil/1280x1280/products/2538/11727/2008_to_2016_YAMAHA_YZF_R6_carbon_fiber_fairing_kit__91122.1646877507.JPG?c=2',
                description: 'High-flow air filter designed to increase airflow while maintaining top-level engine protection. Reusable and washable for long-term use.',
                category: 'Bodywork',
                features: [
                    'Lightweight carbon fiber',
                    'Improved aerodynamics',
                    'Sleek design',
                    'Direct fitment',
                    'Durable construction'
                ]
            },
            
            {
                id: 'bmw-ohlins-1',
                name: 'Öhlins Racing Suspension',
                price: 19999,
                image: 'https://th.bing.com/th/id/OIP.81zJ5cAeVPoCidiV2okTYQHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain',
                description: 'Premium Öhlins racing suspension for ultimate handling and comfortTop-tier suspension for maximum performance and comfort, fully adjustable and race-proven.',
                category: 'Suspension',
                features: [
                    'Premium Öhlins components',
                    'Adjustable damping',
                    'Enhanced ride comfort',
                    'Superior handling',
                    'Track-proven performance'
                ]
            }
        ]
    },
    '2': { // Ducati Panigale V4
        name: 'Ducati Panigale V4',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&h=500',
        specs: {
            engine: '1103cc',
            power: '214 HP',
            year: '2023'
        },
        parts: [
            {
                id: 'ducati-exhaust-1',
                name: 'Termignoni Exhaust',
                price: 14999.99,
                image: 'https://th.bing.com/th/id/R.eebf0a0e4c625416f0660aa88ba80066?rik=nwiYB21XQH8MLQ&riu=http%3a%2f%2flivingwithgravity.com%2fwp-content%2fuploads%2f2021%2f09%2fCover-termignoni_D200_panigale_V4_Black_dett3-2.jpg&ehk=0BXXv%2b5BTLWBLiYud81fKxfB0gj0L28BcXZj%2fL36Rk4%3d&risl=&pid=ImgRaw&r=0',
                description: 'The Termignoni Full Titanium Exhaust System is engineered for riders seeking peak performance and unmistakable Ducati sound. Constructed from lightweight titanium and finished with a carbon fiber end cap, this system significantly reduces weight while enhancing power, torque, and throttle response.',
                features: [
                    'Titanium construction',
                    'Carbon fiber tip',
                    'Aggressive sound',
                    'Weight reduction',
                    'Performance boost'
                ]
            },
            {
                id: 'ducati-ecu-1',
                name: 'ECU Tune',
                price: 15999.99,
                image: 'https://desmoheart.com/cdn/shop/files/IMG_3248-13-07-20-08-41-scaled_a44c840b-4e28-48be-aef4-aa4826b911b2_300x300.jpg?v=1710575796',
                description: 'This performance ECU tune is tailored specifically for the Ducati Panigale V4, optimizing fuel maps, ignition timing, and throttle response. Dyno-tested for accuracy, it unlocks hidden power and smooths out power delivery for both street and track use.',
                features: [
                    'Custom ECU mapping',
                    'Dyno-tested',
                    'Improved throttle response',
                    'Increased horsepower',
                    'Optimized fuel delivery'
                ]
            },
            {
                id: 'ducati-brake-1',
                name: 'Brembo M4.34 Kit',
                price: 1999.99,
                image: 'https://th.bing.com/th/id/OIP.g2Qd0IPb3xkw1IKLPaM_gAHaE8?rs=1&pid=ImgDetMain',
                description: 'The Brembo M4.34 Brake Kit is a complete front braking system upgrade designed to deliver unmatched braking precision and confidence. Built with track performance in mind, it provides exceptional stopping power, consistency, and heat management for spirited road riding and racing.',
                features: [
                    'Brembo calipers',
                    'Superior stopping power',
                    'Heat-resistant rotors',
                    'Enhanced safety',
                    'Easy installation'
                ]
            },
            {
                id: 'ducati-winglets-1',
                name: 'Carbon Fiber Winglets Kit',
                price: 7499.00,
                image: 'https://static1.wrs.it/1331812-thickbox_default/ducati-performance-pair-of-carbon-winglets-ducati-panigale-v4-s-2022-2023.jpg',
                description: 'Aerodynamic carbon fiber winglets designed to enhance downforce and high-speed stability, especially during cornering and hard acceleration.',
                features: [
                    'Lightweight carbon fiber construction',
                    'Increases front-end grip and stability',
                    'OEM-style fitment with aggressive look',
                    'UV-protected clear coat'
                ]
            },
            {
                id: 'ducati-rearsets-1',
                name: 'Rizoma Rearsets Kit',
                price: 5999.00,
                image: 'https://th.bing.com/th/id/OIP.w_DJ23QFHdtky42Ez7TxlAHaE2?rs=1&pid=ImgDetMain',
                description: 'High-quality adjustable rearsets designed for track and performance riding. Crafted from CNC-machined aluminum for precision, durability, and better rider ergonomics.',
                features: [
                    'Fully adjustable footpeg and lever positions',
                    'Enhanced grip and feedback',
                    'Lightweight and durable anodized finish',
                    'Direct fit for Panigale V4'
                ]
            }
        ]
    },
    '3': { // Kawasaki Ninja ZX-10R
        name: 'Kawasaki Ninja ZX-10R',
        specs: {
            engine: '998cc',
            power: '203 HP',
            year: '2023'
        },
        parts: [
            {
                id: 'kawa-exhaust-1',
                name: 'Yoshimura Exhaust',
                price: 12299.99,
                image: 'https://th.bing.com/th/id/OIP.7TVYjqflgRZxBQKDnAGSZAHaHa?rs=1&pid=ImgDetMain',
                description: 'The Yoshimura Full Titanium Racing Exhaust System is designed for riders who demand race-level performance and sound. Crafted with precision engineering, it enhances power delivery, reduces weight, and delivers the signature Yoshimura exhaust tone. Ideal for both track and spirited road riding.',
                features: [
                    'Titanium construction',
                    'Racing design',
                    'Aggressive sound',
                    'Weight reduction',
                    'Performance boost'
                ]
            },
            {
                id: 'kawa-suspension-1',
                name: 'Öhlins Suspension',
                price: 18899.99,
                image: 'https://th.bing.com/th/id/OIP.JzJBC2AakFe99LCE1tNvTAHaGP?o=7rm=3&rs=1&pid=ImgDetMain',
                description: 'The Öhlins Race-Spec Suspension package for the Ninja ZX-10R includes fully adjustable front forks and a premium rear shock designed for aggressive riding, track days, and competitive racing. This setup offers unmatched handling, stability, and rider feedback.',
                features: [
                    'Öhlins components',
                    'Adjustable damping',
                    'Enhanced ride comfort',
                    'Superior handling',
                    'Track-proven performance'
                ]
            },
            {
                id: 'kawa-rcs19-1',
                name: 'Brembo RCS19 Master Cylinder Kit',
                price: 7499.99,
                image: 'https://media.karousell.com/media/photos/products/2017/04/16/brembo_rcs19_radial_brake_master_cylinder_kit_promo_price_1492335716_717c2949.png',
                description: 'Upgrade your front brake feel and power with the Brembo RCS19 radial master cylinder. Perfect for aggressive riding or track days, it provides improved modulation, reduced lever travel, and better brake control.',
                features: [
                    'Adjustable 18/20 ratio',
                    'CNC-machined aluminum body',
                    'Enhanced braking precision and feel',
                    'Suitable for dual-disc setups',
                    'Includes reservoir and mounting kit'
                ]
            },
            {
                id: 'kawa-tankcover-1',
                name: 'Carbon Fiber Tank Cover',
                price: 29999.00,
                image: 'https://carbon2race.com/wp-content/uploads/2015/03/IMG_0775-1067x800.jpg',
                description: 'Add style and weight savings with a carbon fiber tank cover specifically molded for the ZX-10R. Provides a sleek, aggressive look while protecting your fuel tank from scratches and wear.',
                features: [
                    'Lightweight and strong carbon fiber',
                    'UV-protected clear coat finish',
                    'OEM fitment—easy installation',
                    "Enhances the bike's aesthetics"
                ]
            }
        ]
    },
    '4': { // Yamaha YZF-R1M
        name: 'Yamaha YZF-R1M',
        specs: {
            engine: '998cc',
            power: '200 HP',
            year: '2023'
        },
        parts: [
            {
                id: 'yamaha-exhaust-1',
                name: 'M4 Exhaust System',
                price: 11999.99,
                image: 'https://th.bing.com/th/id/OIP.w1PkxsrY8AGOIrH07R8g5QHaHa?o=7rm=3&rs=1&pid=ImgDetMain',
                description: 'The M4 Full Titanium Exhaust System for the Yamaha YZF-R1M is engineered to reduce weight and maximize performance. Featuring a titanium body with a carbon fiber tip, this exhaust enhances throttle response, increases horsepower, and delivers a sharp, race-inspired sound.',
                features: [
                    'Titanium construction',
                    'Carbon tip',
                    'Aggressive sound',
                    'Weight reduction',
                    'Performance boost'
                ]
            },
            {
                id: 'yamaha-rearsets-1',
                name: 'Vortex Racing Rearsets',
                price: 3499.99,
                image: 'https://th.bing.com/th/id/OIP.MP4bN1MCn3NHI-1uPGTnBgHaFj?rs=1&pid=ImgDetMain',
                description: 'The Vortex Racing Rearsets offer fully adjustable foot control positions, ideal for aggressive street riding or track use. Designed to improve ergonomics, ground clearance, and rider feel, these rearsets are made from high-grade CNC-machined aluminum.',
                features: [
                    'Fully adjustable',
                    'Lightweight design',
                    'Improved grip',
                    'Durable construction',
                    'Track-ready'
                ]
            },
            {
                id: 'yamaha-tdrive-1',
                name: 'Brembo T-Drive Brake Rotor Kit',
                price: 9999.99,
                image: 'https://th.bing.com/th/id/OIP.tuNynv5LacW3kogaY43gYAHaHa?rs=1&pid=ImgDetMain',
                description: 'The Brembo T-Drive Rotor Kit is a premium braking upgrade designed to enhance stopping power, reduce brake fade, and deliver consistent performance under high stress. Perfect for spirited riding and track use.',
                features: [
                    'Floating rotor design for better heat dissipation',
                    'Laser-cut stainless steel with aluminum carriers',
                    'Improved initial bite and modulation',
                    'Lightweight and heat-resistant',
                    'Direct OEM replacement for easy install'
                ]
            },
            {
                id: 'yamaha-flashtune-1',
                name: 'FlashTune ECU Kit',
                price: 7999.99,
                image: 'https://cdn11.bigcommerce.com/s-coxd9/images/stencil/1280x1280/products/94043/626845/flashtune-yamaha-r1-bench-ecu-flash-kit-type-18__11172.1678809181.jpg?c=2',
                description: 'The FlashTune ECU Kit allows riders to unlock the full potential of the R1M by customizing fuel maps, throttle response, engine braking, and more. A must-have for those using aftermarket exhausts and air filters.',
                features: [
                    'Reprograms stock ECU with race-level tuning options',
                    'Adjusts fuel/ignition maps, quickshifter behavior, and fan temps',
                    'Removes factory restrictions (top speed, throttle limits)',
                    'Plug-and-play installation with intuitive software',
                    'Optimized for dyno-tuned performance setups'
                ]
            }
        ]
    },
    '5': { // Aprilia RSV4 Factory
        name: 'Aprilia RSV4 Factory',
        specs: {
            engine: '1099cc',
            power: '217 HP',
            year: '2023'
        },
        parts: [
            {
                id: 'aprilia-exhaust-1',
                name: 'SC Project Exhaust',
                price: 1399.99,
                image: 'https://th.bing.com/th/id/OIP.fwuDPJRP_XsJJOYmClQTAAHaHa?rs=1&pid=ImgDetMain',
                description: 'The SC Project Full Exhaust System is a race-inspired, titanium-constructed system engineered to boost performance, reduce weight, and deliver an aggressive exhaust note. Perfect for riders aiming for maximum throttle response and power gains.',
                features: [
                    'Titanium construction',
                    'Race-inspired design',
                    'Aggressive sound',
                    'Weight reduction',
                    'Performance boost'
                ]
            },
            {
                id: 'aprilia-ecu-1',
                name: 'Racing ECU',
                price: 799.99,
                image: 'https://www.wsc-shop.de/images/product_images/popup_images/IMG_8485-2_0.jpg',
                description: 'The Racing ECU is a competition-grade upgrade designed to work seamlessly with performance mods like the SC Project Exhaust. It reprograms the engine\'s behavior for maximum output, reduced engine braking, and faster throttle response.',
                features: [
                    'Custom ECU maps',
                    'Competition-level tuning',
                    'Improved throttle response',
                    'Increased horsepower',
                    'Optimized fuel delivery'
                ]
            },
            {
                id: 'aprilia-ozwheels-1',
                name: 'OZ Racing GASS RS-A Forged Wheels',
                price: 4999.99,
                image: 'https://www.bellissimoto.com/image/catalog/OZ%20wheels/gass_rw_anodizzato_nero_opaco_9.jpg',
                description: 'The OZ Racing GASS RS-A Forged Wheel Set is engineered to reduce rotational mass for quicker acceleration, improved handling, and better braking performance. Designed specifically for high-performance motorcycles like the RSV4 Factory.',
                features: [
                    'Forged aluminum construction – lightweight and strong',
                    'Reduces unsprung and rotational weight for sharper handling',
                    'Anodized finish for durability and corrosion resistance',
                    'Compatible with OEM braking and ABS systems',
                    'Track-proven performance upgrade'
                ]
            }
        ]
    },
    '6': { // Suzuki Hayabusa
        name: 'Honda CBR1000RR-R',
        specs: {
            engine: '1340cc',
            power: '187 HP',
            year: '2023'
        },
        parts: [
            {
                id: 'hayabusa-exhaust-1',
                name: 'Yoshimura R-77 Full Exhaust',
                price: 15999.99,
                image: 'https://e.ridersdiscount.com/generated/328/1/69328-stainless-steel-mid-pipecarbon-fiber-mufflercarbon-fiber-end-cap-yoshimura-trc-d-slip-on-muffler-dual-outlet-ss-cf-cf-for-suz-gsx-r600-750-11-13_1000_1000.jpg',
                description: 'Full titanium exhaust system for maximum performance and signature sound.',
                features: [
                    'Titanium construction',
                    'Aggressive sound',
                    'Weight reduction',
                    'Performance boost',
                    'Direct fitment'
                ]
            },
            {
                id: 'hayabusa-ecu-1',
                name: 'ECU Flash',
                price: 17999.99,
                image: 'https://sniper-tuning.com/wp-content/uploads/2023/10/IMG_5403_1920x1920.jpg',
                description: 'Custom ECU flash for improved throttle response and power delivery.',
                features: [
                    'Custom mapping',
                    'Improved throttle response',
                    'Increased horsepower',
                    'Optimized for performance exhausts',
                    'Plug-and-play'
                ]
            },
            {
                id: 'hayabusa-brake-1',
                name: 'Brembo GP4-RX Caliper Kit',
                price: 12999.99,
                image: 'https://cdn11.bigcommerce.com/s-coxd9/images/stencil/1280x1280/products/41483/353048/Brembo-Nickel-GP4-RX-Front-Caliper-220.B010.20-1__53118.1453315469.jpg?c=2',
                description: 'High-performance Brembo caliper kit for superior braking power and control.',
                features: [
                    'GP4-RX calipers',
                    'Improved braking power',
                    'Heat-resistant',
                    'Track-proven',
                    'Easy installation'
                ]
            }
        ]
    },
    '7': { // Honda CBR1000RR
        name: 'Suzuki GSX-R1000R',
        specs: {
            engine: '999cc',
            power: '189 HP',
            year: '2023'
        },
        parts: [
            {
                id: 'cbr-exhaust-1',
                name: 'Akrapovic Racing Exhaust',
                price: 14999.99,
                image: 'https://th.bing.com/th/id/OIP.VRF5b5t6jfv3eCMQL-OcnAHaFj?rs=1&pid=ImgDetMain',
                description: 'Akrapovic full system for the CBR1000RR, designed for maximum power and weight savings.',
                features: [
                    'Full titanium construction',
                    'Carbon fiber tip',
                    'Aggressive sound',
                    'Weight reduction',
                    'Performance boost'
                ]
            },
            {
                id: 'cbr-quickshifter-1',
                name: 'Quickshifter Kit',
                price: 4999.99,
                image: 'https://images.nettimoto.com/live/2023/09/01/9e84d6fa47d9f2f4-large.jpg',
                description: 'Plug-and-play quickshifter for seamless upshifts and downshifts.',
                features: [
                    'Seamless up/down shifts',
                    'Plug-and-play installation',
                    'Track-proven reliability',
                    'Adjustable sensitivity',
                    'No clutch needed for shifting'
                ]
            },
            {
                id: 'cbr-rearsets-1',
                name: 'Gilles Tooling Rearsets',
                price: 5999.99,
                image: 'https://www.fc-moto.de/WebRoot/FCMotoDB/Shops/10207048/630A/2AE0/141B/A720/180B/AC1E/1406/7791/1096198002_1_800wx800h_ml.jpeg',
                description: 'Fully adjustable rearsets for improved ergonomics and ground clearance.',
                features: [
                    'Fully adjustable',
                    'CNC-machined aluminum',
                    'Improved grip',
                    'Durable anodized finish',
                    'Track-ready'
                ]
            }
        ]
    },
    '8': { // KTM RC8
        name: 'MV Agusta F4 RC',
        specs: {
            engine: '1190cc',
            power: '173 HP',
            year: '2015'
        },
        parts: [
            {
                id: 'ktm-exhaust-1',
                name: 'Akrapovic Evolution Line Exhaust',
                price: 79999.99,
                image: 'https://www.bodis-exhaust.com/bodisdata/Uploads/content/jahrgangsbilder/37/006.jpg?8',
                description: 'Akrapovic Evolution Line for the RC8, offering maximum performance and weight savings.',
                features: [
                    'Titanium construction',
                    'Aggressive sound',
                    'Weight reduction',
                    'Performance boost',
                    'Direct fitment'
                ]
            },
            {
                id: 'ktm-clipons-1',
                name: 'Woodcraft Clip-Ons',
                price: 2999.99,
                image: 'https://cdn11.bigcommerce.com/s-coxd9/images/stencil/1280x1280/products/155074/601984/woodcraft-75mm-rise-side-mount-clip-ons-3__87235.1660071332.jpg?c=2',
                description: 'Adjustable clip-ons for improved ergonomics and control.',
                features: [
                    'Adjustable angle',
                    'Lightweight aluminum',
                    'Improved control',
                    'Easy installation',
                    'Track-proven'
                ]
            },
            {
                id: 'ktm-rearsets-1',
                name: 'LighTech Rearsets',
                price: 4999.99,
                image: 'https://cdn11.bigcommerce.com/s-coxd9/images/stencil/1280x1280/products/159173/639421/lightech-yamaha-r7-22-23-rearsets-fixed-footpegs__67370.1708983093.jpg?c=2',
                description: 'LighTech rearsets for the RC8, designed for aggressive riding and maximum adjustability.',
                features: [
                    'Fully adjustable',
                    'CNC-machined',
                    'Lightweight',
                    'Durable finish',
                    'Track-ready'
                ]
            }
        ]
    },
    '9': { // Triumph Daytona 675
        name: 'KTM 1290 Super Duke R',
        specs: {
            engine: '675cc',
            power: '128 HP',
            year: '2017'
        },
        parts: [
            {
                id: 'triumph-exhaust-1',
                name: 'Arrow Full Exhaust System',
                price: 12999.99,
                image: 'https://vandemonperformance.com.au/cdn/shop/files/KTM1290SuperDuke3.jpg?v=1683773011',
                description: 'Arrow full exhaust system for the Daytona 675, engineered for power and weight savings.',
                features: [
                    'Titanium and stainless construction',
                    'Aggressive sound',
                    'Weight reduction',
                    'Performance boost',
                    'Direct fitment'
                ]
            },
            {
                id: 'triumph-ecu-1',
                name: 'ECU Tune',
                price: 4999.99,
                image: 'https://i.ebayimg.com/images/g/hcsAAOSwurJjIbEx/s-l1600.jpg',
                description: 'Custom ECU tune for the Daytona 675, optimizing fuel and ignition maps for best performance.',
                features: [
                    'Custom mapping',
                    'Improved throttle response',
                    'Increased horsepower',
                    'Optimized for performance exhausts',
                    'Plug-and-play'
                ]
            },
            {
                id: 'triumph-levers-1',
                name: 'ASV C5 Levers',
                price: 2999.99,
                image: 'https://i.ebayimg.com/images/g/AGcAAOSwnQFjz9Zl/s-l500.jpg',
                description: 'ASV C5 adjustable levers for improved comfort and control.',
                features: [
                    'Fully adjustable',
                    'CNC-machined',
                    'Improved comfort',
                    'Durable finish',
                    'Track-proven'
                ]
            }
        ]
    }
};

// Universal fallback parts if no bikeId is specified or invalid
const defaultParts = [
    {
        id: 'universal-1',
        name: 'Motorcycle Chain Lube',
        description: 'High-performance chain lubricant suitable for all motorcycle chains. Reduces friction and extends chain life.',
        price: 450.00,
        originalPrice: 550.00,
        image: 'https://down-my.img.susercontent.com/file/530d632d71b3363bb6fbeffecebc12b8',
        features: [
            'Suitable for all chain types',
            'Water-resistant formula',
            'Long-lasting protection',
            'Easy application'
        ]
    },
    {
        id: 'universal-2',
        name: 'Motorcycle Cover',
        description: 'Heavy-duty motorcycle cover with elastic hem and tie-down straps. Protects against UV, rain, and dust.',
        price: 1200.00,
        originalPrice: 1500.00,
        image: 'https://th.bing.com/th/id/R.c4b56b1126c66b75e14b110f82c77ce3?rik=PwGB%2b8g0Q3nlhA&riu=http%3a%2f%2fwww.ghb-group.com%2fwp-content%2fuploads%2f2020%2f08%2f611S7aBIrVL._AC_SL1001_.jpg&ehk=4VMKEW8GreW8Ba4yUwRvUhyZMnxIR88RDboDFUnqTMI%3d&risl=&pid=ImgRaw&r=0',
        features: [
            'Fits most motorcycles',
            'UV and water resistant',
            'Elastic hem design',
            'Includes storage bag'
        ]
    },
    {
        id: 'universal-3',
        name: 'Phone Mount',
        description: 'Universal smartphone mount with anti-vibration technology. Compatible with most smartphones and handlebar sizes.',
        price: 800.00,
        originalPrice: 1000.00,
        image: 'https://m.media-amazon.com/images/I/71Ogsvxa5KS._AC_SL1300_.jpg',
        features: [
            'Universal compatibility',
            'Anti-vibration design',
            'Easy installation',
            '360° rotation'
        ]
    },
    {
        id: 'universal-4',
        name: 'LED Indicators',
        description: 'Bright LED indicator set with universal mounting brackets. Plug-and-play installation for most motorcycles.',
        price: 650.00,
        originalPrice: 800.00,
        image: 'https://media.takealot.com/covers_images/9721bed4cb224ac7980991492a0baf36/s-zoom.file',
        features: [
            'Universal fit design',
            'Bright LED technology',
            'Easy installation',
            'Includes mounting hardware'
        ]
    },
    {
        id: 'universal-5',
        name: 'Motorcycle Tool Kit',
        description: 'Comprehensive tool kit with essential tools for motorcycle maintenance and emergency repairs.',
        price: 950.00,
        originalPrice: 1200.00,
        image: 'https://th.bing.com/th/id/OIP.DKyLK0HGNrbKWTnTvbeTjAHaHa?rs=1&pid=ImgDetMain',
        features: [
            'Essential tools included',
            'Compact storage case',
            'Quality construction',
            'Emergency roadside use'
        ]
    },
    {
        id: 'universal-6',
        name: 'Motorcycle Seat Cushion',
        description: 'Gel-infused seat cushion for enhanced comfort during long rides. Universal fit for most motorcycle seats.',
        price: 750.00,
        originalPrice: 900.00,
        image: 'https://m.media-amazon.com/images/I/51qIjkHuEaL.jpg',
        features: [
            'Gel-infused comfort',
            'Universal seat fit',
            'Anti-slip base',
            'Easy installation'
        ]
    },
    {
        id: 'universal-7',
        name: 'Motorcycle Alarm System',
        description: 'Advanced motorcycle alarm with motion sensor, remote control, and anti-theft features.',
        price: 1800.00,
        originalPrice: 2200.00,
        image: 'https://dirt-xtreme.com/wp-content/uploads/2024/03/DALL%C2%B7E-2024-03-31-08.12.50-An-image-of-a-modern-sleek-GPS-alarm-device-for-motorcycles.-The-device-is-compact-with-a-black-or-dark-gray-casing-and-has-a-clear-digital-display.webp',
        features: [
            'Motion sensor detection',
            'Remote control operation',
            'Loud siren alarm',
            'Easy installation'
        ]
    }
];

// Bike Shop Class to handle all functionality
class BikeShop {
    constructor() {
        this.cartManager = window.cartManager; // Use the global cart manager
        this.init();
    }

    init() {
        // We use DOMContentLoaded because this script is loaded at the end of the body
        this.setupEventListeners();
        this.updateCartCount();
        this.handleCurrentPage();
    }

    setupEventListeners() {
        // Search functionality for shop-by-bike page
        const searchInput = document.getElementById('bikeSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleBikeSearch(e.target.value));
        }

        // Add to cart button listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const partId = e.target.getAttribute('data-part-id');
                this.addToCart(partId);
            }
        });

        // Shop Now button listeners - redirect to dedicated bike parts page
        const shopNowBtns = document.querySelectorAll('.shop-now-btn');
        shopNowBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const bikeCard = btn.closest('.bike-card');
                const bikeId = bikeCard.getAttribute('data-bike-id');
                window.location.href = `bike-parts.html?bikeId=${bikeId}`;
            });
        });
    }

    handleCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop();
        
        if (currentPage === 'bike-parts.html') {
            this.loadBikeParts();
        } else if (currentPage === 'shop-by-bike.html') {
            this.initializeShopByBike();
        }
    }

    initializeShopByBike() {
        // Handle any URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const bikeId = urlParams.get('bikeId');
        
        if (bikeId) {
            // If a bike ID is specified in the URL, highlight that bike
            this.scrollToBike(bikeId);
        }
    }

    scrollToBike(bikeId) {
        const bikeCard = document.querySelector(`[data-bike-id="${bikeId}"]`);
        if (bikeCard) {
            bikeCard.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                bikeCard.classList.add('highlight');
                setTimeout(() => {
                    bikeCard.classList.remove('highlight');
                }, 2000);
            }, 500);
        }
    }

    handleBikeSearch(searchTerm) {
        const bikeCards = document.querySelectorAll('.bike-card');
        const searchLower = searchTerm.toLowerCase();

        bikeCards.forEach(card => {
            const bikeName = card.querySelector('.bike-name').textContent.toLowerCase();
            const bikeSpecs = card.querySelector('.bike-specs').textContent.toLowerCase();
            
            if (bikeName.includes(searchLower) || bikeSpecs.includes(searchLower)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    loadBikeParts() {
        // Get bike ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const bikeId = urlParams.get('bikeId');
        
        if (!bikeId) {
            // If no bike ID is specified, show default parts
            document.getElementById('bike-name').textContent = 'Universal Bike Parts';
            this.renderBikeParts(defaultParts);
            return;
        }
        
        // Get bike data
        const bike = bikePartsData[String(bikeId)];
        
        if (bike) {
            // Update page title with bike name
            document.getElementById('bike-name').textContent = `${bike.name} Parts`;
            
            // Render parts for this specific bike
            this.renderBikeParts(bike.parts);
        } else {
            // If bike ID doesn't exist in data, show default parts
            document.getElementById('bike-name').textContent = 'Universal Bike Parts';
            this.renderBikeParts(defaultParts);
        }
    }
    
    renderBikeParts(parts) {
        const partsContainer = document.getElementById('bikeParts');
        
        if (!partsContainer) {
            console.error('Bike parts container not found');
            return;
        }
        
        // Clear existing content
        partsContainer.innerHTML = '';
        
        if (!parts || parts.length === 0) {
            partsContainer.innerHTML = '<div class="no-parts">No parts available for this bike yet.</div>';
            return;
        }
        
        // Generate HTML for each part
        parts.forEach(part => {
            const partCard = document.createElement('div');
            partCard.className = 'part-card';
            partCard.innerHTML = `
                <div class="part-image">
                    <img src="${part.image}" alt="${part.name}" loading="lazy">
                </div>
                <div class="part-info">
                    <h3 class="part-name">${part.name}</h3>
                    <p class="part-description">${part.description}</p>
                    <div class="price">₹${part.price.toFixed(2)}</div>
                    <button class="primary-button view-details-btn" data-part-id="${part.id}">
                        View Details
                    </button>
                </div>
            `;
            
            // Add click event to view details button
            const viewDetailsBtn = partCard.querySelector('.view-details-btn');
            viewDetailsBtn.addEventListener('click', () => this.showProductDetails(part));
            
            partsContainer.appendChild(partCard);
        });

        // Initialize modal functionality
        this.initializeModal();
    }

    showProductDetails(part) {
        const modal = document.getElementById('productDetailModal');
        
        // Update modal content
        document.getElementById('modalProductName').textContent = part.name;
        document.getElementById('modalMainImage').src = part.image;
        document.getElementById('modalMainImage').alt = part.name;
        
        // Set prices
        const originalPrice = document.getElementById('modalOriginalPrice');
        const currentPrice = document.getElementById('modalCurrentPrice');
        
        if (part.originalPrice && part.originalPrice > part.price) {
            originalPrice.textContent = `₹${part.originalPrice.toFixed(2)}`;
            originalPrice.style.display = 'block';
        } else {
            originalPrice.style.display = 'none';
        }
        currentPrice.textContent = `₹${part.price.toFixed(2)}`;
        
        // Update description
        document.getElementById('modalDescription').textContent = part.description;
        
        // Update features list
        const featuresList = document.getElementById('modalFeatures');
        if (part.features && Array.isArray(part.features)) {
            featuresList.innerHTML = part.features.map(feature => `
                <li>${feature}</li>
            `).join('');
        } else {
            featuresList.innerHTML = '<li>Features information not available</li>';
        }
        
        // Show size options if available
        const sizeSelector = document.getElementById('modalSizeSelector');
        if (part.sizes && Array.isArray(part.sizes)) {
            const sizeOptions = sizeSelector.querySelector('.size-options');
            sizeOptions.innerHTML = part.sizes.map(size => `
                <button class="size-option" data-size="${size}">${size}</button>
            `).join('');
            sizeSelector.style.display = 'block';
            
            // Add click handlers for size options
            const sizeButtons = sizeOptions.querySelectorAll('.size-option');
            sizeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    sizeButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        } else {
            sizeSelector.style.display = 'none';
        }
        
        // Show color options if available
        const colorSelector = document.getElementById('modalColorSelector');
        if (part.colors && Array.isArray(part.colors)) {
            const colorOptions = colorSelector.querySelector('.color-options');
            colorOptions.innerHTML = part.colors.map(color => `
                <button class="color-option" data-color="${color}">${color}</button>
            `).join('');
            colorSelector.style.display = 'block';
            
            // Add click handlers for color options
            const colorButtons = colorOptions.querySelectorAll('.color-option');
            colorButtons.forEach(button => {
                button.addEventListener('click', () => {
                    colorButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        } else {
            colorSelector.style.display = 'none';
        }
        
        // Initialize quantity controls
        const quantityInput = modal.querySelector('.quantity-input');
        const decreaseBtn = modal.querySelector('.quantity-btn.decrease');
        const increaseBtn = modal.querySelector('.quantity-btn.increase');
        
        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
        
        // Add to cart button handler
        const addToCartBtn = document.getElementById('modalAddToCart');
        addToCartBtn.onclick = () => {
            const quantity = parseInt(quantityInput.value);
            const selectedSize = modal.querySelector('.size-option.active')?.getAttribute('data-size');
            const selectedColor = modal.querySelector('.color-option.active')?.getAttribute('data-color');
            
            const cartItem = {
                ...part,
                quantity,
                size: selectedSize,
                color: selectedColor
            };
            
            this.cartManager.addToCart(cartItem);
            this.cartManager.showNotification(`${part.name} added to cart`);
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset tab state
        const defaultTab = modal.querySelector('.tab-btn[data-tab="description"]');
        defaultTab.click();
    }

    initializeModal() {
        const modal = document.getElementById('productDetailModal');
        const closeBtn = modal.querySelector('.modal-close');
        const tabButtons = modal.querySelectorAll('.tab-btn');
        
        // Close modal when clicking close button or outside modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Tab functionality
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                modal.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                document.getElementById(`${tab}Panel`).classList.add('active');
            });
        });
    }

    addToCart(part) {
        // Validate part data
        if (!part || !part.id) {
            console.error('Invalid part data:', part);
            this.showNotification('Error: Invalid part data');
            return;
        }

        if (!part.name || !part.price) {
            console.error('Part missing required fields:', part);
            this.showNotification('Error: Part missing required information');
            return;
        }

        // Convert to the format expected by cart manager
        const product = {
            id: part.id,
            name: part.name,
            price: part.price,
            image: part.image || '',
            description: part.description,
            quantity: part.quantity,
            selectedSize: part.selectedSize,
            selectedColor: part.selectedColor
        };
        
        // Use cart manager to add to cart
        if (this.cartManager) {
            this.cartManager.addToCart(product);
        } else {
            // Fallback to old system if cart manager not available
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            this.updateCartCount();
            this.showNotification('Part added to cart!');
        }
    }

    updateCartCount() {
        if (this.cartManager) {
            // Use cart manager's cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = this.cartManager.cart.length;
            }
        } else {
            // Fallback to old system
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = cart.length;
            }
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the bike shop
const bikeShop = new BikeShop(); 