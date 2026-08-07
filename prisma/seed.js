import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // ─── Admin User ────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@travel.com' },
    update: {},
    create: {
      email: 'admin@travel.com',
      name: 'Admin User',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // ─── Tours ─────────────────────────────────────────────────────────────────
  const tours = await Promise.all([

    // 1. Hunza Valley Explorer
    prisma.tour.create({
      data: {
        title: 'Hunza Valley Explorer',
        description:
          'Discover the legendary Hunza Valley — one of the most beautiful places on Earth. Journey through the iconic Karakoram Highway, visit ancient Baltit and Altit Forts, marvel at the turquoise Attabad Lake, walk the world-famous Hussaini Suspension Bridge, and reach the Khunjerab Pass at 4,693m on the Pakistan-China border.',
        price: 45000,
        duration: 6,
        location: 'Hunza Valley, Gilgit-Baltistan',
        images: [
          'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?q=80&w=2070&auto=format&fit=crop',
        ],
        featured: true,
        itinerary: JSON.stringify([
          { day: 1, title: 'Arrival in Gilgit', description: 'Arrive by flight or road. Transfer to hotel. Welcome dinner and trip briefing.' },
          { day: 2, title: 'Gilgit to Hunza via KKH', description: 'Drive the scenic Karakoram Highway. Stop at Rakaposhi Viewpoint (8,047m backdrop). Check in at Karimabad.' },
          { day: 3, title: 'Karimabad Sightseeing', description: 'Visit Baltit Fort (900-year-old), Altit Fort, Ganish Village, and Eagle\'s Nest viewpoint for a stunning sunset over Rakaposhi.' },
          { day: 4, title: 'Attabad Lake & Passu', description: 'Boat ride on the stunning turquoise Attabad Lake. Visit Passu Cones, Hussaini Suspension Bridge, and Gulkin Glacier.' },
          { day: 5, title: 'Khunjerab Pass (4,693m)', description: 'Day trip to the highest paved international border crossing in the world. Pak-China border crossing experience.' },
          { day: 6, title: 'Departure', description: 'Return to Gilgit. Farewell breakfast and departure transfers.' },
        ]),
        included: [
          'Private 4x4 transport throughout',
          'Hotel accommodation (5 nights)',
          'Breakfast and dinner daily',
          'English-speaking local guide',
          'Baltit & Altit Fort entry tickets',
          'Attabad Lake boat ride',
          'Airport/hotel transfers',
        ],
        excluded: [
          'Airfare to/from Gilgit',
          'Lunch & personal beverages',
          'Travel insurance',
          'Khunjerab National Park fee (PKR 600)',
          'Personal expenses & tips',
        ],
        maxGroupSize: 12,
        available: true,
        featured: true,
      },
    }),

    // 2. Skardu & Deosai Adventure
    prisma.tour.create({
      data: {
        title: 'Skardu & Deosai Plains Adventure',
        description:
          'Experience the raw, untouched beauty of Skardu — the gateway to the world\'s greatest mountain ranges. Visit the legendary Shangrila Resort on Kachura Lake, camp under a billion stars on the vast Deosai Plateau (the world\'s second-highest plateau at 4,114m), explore Satpara Lake, and discover the ancient Skardu Fort overlooking the Indus River.',
        price: 52000,
        duration: 7,
        location: 'Skardu, Gilgit-Baltistan',
        images: [
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
        ],
        featured: true,
        itinerary: JSON.stringify([
          { day: 1, title: 'Arrival in Skardu', description: 'Fly into Skardu Airport (most scenic approach in Pakistan). Transfer to hotel. Evening stroll along the Indus.' },
          { day: 2, title: 'Skardu City & Kachura Lakes', description: 'Visit Skardu Fort, Kharpocho Fort. Boat ride on Lower Kachura (Shangrila) Lake. Picnic at Upper Kachura Lake.' },
          { day: 3, title: 'Satpara Lake & Buddha Rock', description: 'Morning visit to Satpara Lake with optional kayaking. Afternoon at the ancient Buddha Rock carving (7th century CE) on the Indus riverbank.' },
          { day: 4, title: 'Drive to Deosai', description: 'Full-day off-road drive to the Deosai National Park. Encounter Himalayan Brown Bears in the wild. Camp at Sheosar Lake (4,142m).' },
          { day: 5, title: 'Deosai to Astore Valley', description: 'Trek through wildflower meadows. Optional: visit Rama Meadows. Return route via Chilam Chowki border post area.' },
          { day: 6, title: 'Shigar Valley Excursion', description: 'Day trip to Shigar Valley. Visit the UNESCO-listed Shigar Fort Palace (Serena Heritage Hotel). Local cold-water trout lunch.' },
          { day: 7, title: 'Departure', description: 'Morning flight back to Islamabad. Farewell breakfast.' },
        ]),
        included: [
          'Private 4x4 Prado/Land Cruiser transport',
          'Hotel accommodation (4 nights) + camping (2 nights)',
          'All meals included',
          'English-speaking guide + porter',
          'Camping equipment (tents, sleeping bags, mattresses)',
          'Deosai National Park entry fee',
          'Boat rides and entrance tickets',
        ],
        excluded: [
          'Skardu flights (PIA/Air Sial — approx PKR 12,000–22,000 each way)',
          'Travel insurance',
          'Personal gear and clothing',
          'Tips for guide and driver',
        ],
        maxGroupSize: 10,
        available: true,
        featured: true,
      },
    }),

    // 3. Fairy Meadows & Nanga Parbat
    prisma.tour.create({
      data: {
        title: 'Fairy Meadows & Nanga Parbat Base Camp',
        description:
          'Stand at the foot of Nanga Parbat (8,126m), the world\'s 9th-highest mountain and the infamous "Killer Mountain." This journey takes you through the remote Diamer district, up thrilling jeep tracks to Tattu Village, followed by a scenic trek through pine forests to Fairy Meadows — the most spectacular alpine meadow in Pakistan with unobstructed views of Nanga Parbat\'s Raikot Face.',
        price: 38000,
        duration: 5,
        location: 'Fairy Meadows, Diamer, Gilgit-Baltistan',
        images: [
          'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1587749090392-05f5bb27f5f8?q=80&w=1974&auto=format&fit=crop',
        ],
        featured: true,
        itinerary: JSON.stringify([
          { day: 1, title: 'Islamabad to Raikot Bridge', description: 'Early morning departure from Islamabad via Karakoram Highway. Overnight at Chilas or Raikot Bridge guesthouse.' },
          { day: 2, title: 'Jeep Ride to Tattu & Trek to Fairy Meadows', description: 'Thrilling 1.5-hour jeep ride to Tattu Village (one of the most adventurous roads in Pakistan). 3-hour trek through dense pine forest to Fairy Meadows (3,300m). First views of Nanga Parbat.' },
          { day: 3, title: 'Nanga Parbat Base Camp Trek', description: 'Full-day trek to the Raikot Base Camp at Beyal Camp (3,800m). Get up close to the Raikot Glacier. Breathtaking views of the massive Raikot Face of Nanga Parbat.' },
          { day: 4, title: 'Sunrise at Fairy Meadows', description: 'Watch the alpenglow (pink sunrise) on Nanga Parbat — one of the most spectacular natural light shows on Earth. Free afternoon for photography and relaxation.' },
          { day: 5, title: 'Trek Down & Return', description: 'Morning descent to Tattu. Jeep back to Raikot Bridge. Drive back towards Islamabad.' },
        ]),
        included: [
          'Private 4x4 transport Islamabad–Raikot',
          'Local jeep hire Raikot–Tattu (specialist drivers)',
          'Accommodation: guesthouse + wooden huts at Fairy Meadows',
          'All meals (3x daily)',
          'Licensed mountain guide',
          'Fairy Meadows entry permit',
        ],
        excluded: [
          'Personal trekking gear (poles, boots, layers)',
          'Travel insurance (mandatory for Base Camp)',
          'Emergency evacuation costs',
          'Tips for local jeep drivers and guide',
        ],
        maxGroupSize: 8,
        available: true,
        featured: false,
      },
    }),

    // 4. Grand Northern Circuit
    prisma.tour.create({
      data: {
        title: 'Grand Northern Circuit – Hunza, Skardu & Nagar',
        description:
          'The ultimate Gilgit-Baltistan experience in one grand circuit. Starting from Gilgit, loop through Nagar Valley (known for its glaciers), up to Hunza and Khunjerab, back via the Skardu Road to explore Shigar and Skardu, culminating with a sunset over Deosai. This premium package covers all the iconic highlights in one connected journey.',
        price: 85000,
        duration: 10,
        location: 'Gilgit-Baltistan (Full Circuit)',
        images: [
          'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop',
        ],
        
        featured: true,
        itinerary: JSON.stringify([
          { day: 1, title: 'Arrival in Gilgit', description: 'Flight to Gilgit. Hotel check-in. City orientation walk along Gilgit Bazaar.' },
          { day: 2, title: 'Naltar Valley', description: 'Day trip to Naltar Valley — famous for its three stunning blue, green, and golden lakes at 3,050m.' },
          { day: 3, title: 'Gilgit to Nagar', description: 'Drive to Nagar Valley via Aliabad. Visit Hopar Glacier (one of Pakistan\'s most accessible glaciers). Evening at Nagar Fort.' },
          { day: 4, title: 'Nagar to Hunza – Karimabad', description: 'Attabad Lake boat crossing or tunnel. Check in Karimabad. Sunset from Eagle\'s Nest viewpoint.' },
          { day: 5, title: 'Hunza Sightseeing', description: 'Baltit Fort, Altit Fort, Ganish Village, local cherry and apricot orchards (seasonal). Shopping in Karimabad.' },
          { day: 6, title: 'Khunjerab Pass', description: 'Day trip to Khunjerab Pass (4,693m). Passu Cones, Hussaini Bridge. Return to Karimabad.' },
          { day: 7, title: 'Hunza to Skardu', description: 'Scenic full-day drive via Gilgit–Skardu Road along the Indus River gorge. Check in Skardu.' },
          { day: 8, title: 'Skardu & Shigar', description: 'Visit Kharpocho Fort, Kachura Lakes, and Shigar Fort Palace (Serena Heritage Hotel).' },
          { day: 9, title: 'Deosai Plains', description: 'Full-day drive through Deosai National Park. Brown Bear spotting. Sheosar Lake picnic. Return to Skardu.' },
          { day: 10, title: 'Departure', description: 'Morning flight Skardu–Islamabad. Farewell breakfast.' },
        ]),
        included: [
          'Luxury Land Cruiser V8 or Prado for the full circuit',
          'Hotel accommodation (9 nights) in premium properties',
          'All meals (breakfast, lunch, dinner)',
          'Senior English-speaking guide for the full tour',
          'All entry fees, boat rides, and jeep transfers',
          'Welcome and farewell dinners',
          'Walkie-talkie communication on remote routes',
        ],
        excluded: [
          'Return flights (Islamabad→Gilgit + Skardu→Islamabad)',
          'Travel insurance',
          'Personal shopping and souvenirs',
          'Alcoholic beverages',
          'Emergency evacuation insurance',
        ],
        maxGroupSize: 8,
        available: true,
        featured: false,
      },
    }),

    // 5. Naltar Valley & Lakes Weekend
    prisma.tour.create({
      data: {
        title: 'Naltar Valley – Three Lakes Weekend',
        description:
          'A perfect short escape from Gilgit into the pine-scented Naltar Valley, home to three colour-shifting lakes (Satrangi Lakes) and the PAF Naltar ski resort. A magical alpine experience with dense spruce forests, golden meadows, and lakes that shift from emerald to sapphire depending on the light. Great for families and first-time visitors.',
        price: 18000,
        duration: 2,
        location: 'Naltar Valley, Gilgit',
        images: [
          'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?q=80&w=2070&auto=format&fit=crop',
        ],
        featured: false,
        itinerary: JSON.stringify([
          { day: 1, title: 'Gilgit to Naltar', description: '2-hour jeep drive (40km) from Gilgit city through stunning gorges. Camp at Naltar Bala (3,050m). Afternoon walk to the first lake.' },
          { day: 2, title: 'Three Lakes Trek & Return', description: 'Morning trek to all three Satrangi Lakes. Photography session. Return to Gilgit by afternoon.' },
        ]),
        included: [
          '4x4 jeep transfers (Gilgit–Naltar–Gilgit)',
          'Camping equipment and meals',
          'Local guide',
          'Entry permit',
        ],
        excluded: [
          'Personal gear',
          'Travel insurance',
          'Tips',
        ],
        maxGroupSize: 15,
        available: true,
        featured: false,
      },
    }),

  ]);

  console.log(`✅ Created ${tours.length} tours`);

  // ─── Cars ──────────────────────────────────────────────────────────────────
  const cars = await Promise.all([

    // 1. Land Cruiser V8
    prisma.car.create({
      data: {
        name: 'Toyota Land Cruiser V8',
        type: 'SUV',
        pricePerDay: 25000,
        image: 'https://images.unsplash.com/photo-1605810731671-50e509eb050b?q=80&w=2070',
        images: [
          'https://images.unsplash.com/photo-1605810731671-50e509eb050b?q=80&w=2070',
          'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=2070',
        ],
        features: ['Full-time 4WD', 'AC', 'Satellite GPS', 'Leather Seats', 'Winch', 'First Aid Kit', 'High Ground Clearance', 'Snorkel'],
        seats: 7,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        available: true,
      },
    }),

    // 2. Toyota Land Cruiser Prado
    prisma.car.create({
      data: {
        name: 'Toyota Land Cruiser Prado',
        type: 'SUV',
        pricePerDay: 18000,
        image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=2070',
        images: [
          'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=2070',
        ],
        features: ['4WD', 'AC', 'GPS Navigation', 'Bluetooth', 'Roof Rack', 'Mountain-Ready Tires', 'High Clearance'],
        seats: 7,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        available: true,
      },
    }),

    // 3. Toyota Hilux Surf (4Runner)
    prisma.car.create({
      data: {
        name: 'Toyota Hilux Surf 4x4',
        type: 'SUV',
        pricePerDay: 12000,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070',
        images: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070',
        ],
        features: ['4WD', 'AC', 'Bluetooth', 'Luggage Carrier', 'Mountain Tyres'],
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        available: true,
      },
    }),

    // 4. Toyota Hiace Coaster (Mini Bus)
    prisma.car.create({
      data: {
        name: 'Toyota Coaster (Mini Bus)',
        type: 'Bus',
        pricePerDay: 22000,
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070',
        images: [
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070',
        ],
        features: ['AC', 'Reclining Seats', 'Luggage Space', 'Music System', 'USB Charging', 'Experienced Mountain Driver'],
        seats: 22,
        transmission: 'Manual',
        fuelType: 'Diesel',
        available: true,
      },
    }),

    // 5. Toyota Fortuner
    prisma.car.create({
      data: {
        name: 'Toyota Fortuner',
        type: 'SUV',
        pricePerDay: 15000,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070',
        images: [
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070',
        ],
        features: ['4WD', 'AC', 'GPS', 'Bluetooth', 'Sunroof', '7-Seater'],
        seats: 7,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        available: true,
      },
    }),

    // 6. Suzuki Jimny (Jeep for Fairy Meadows)
    prisma.car.create({
      data: {
        name: 'Suzuki Jimny (Local Jeep)',
        type: 'Jeep',
        pricePerDay: 8000,
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070',
        images: [
          'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070',
        ],
        features: ['4WD', 'Open Body (adventure)', 'Ideal for Fairy Meadows', 'Skilled Local Driver', 'Compact for narrow tracks'],
        seats: 4,
        transmission: 'Manual',
        fuelType: 'Petrol',
        available: true,
      },
    }),

  ]);

  console.log(`✅ Created ${cars.length} cars`);

  // ─── Hotels ────────────────────────────────────────────────────────────────
  const hotels = await Promise.all([

    // 1. Hunza Serena Hotel
    prisma.hotel.create({
      data: {
        name: 'Hunza Serena Hotel',
        location: 'Karimabad, Hunza, Gilgit-Baltistan',
        description:
          'The flagship luxury property in Hunza Valley, perched above Karimabad with sweeping panoramic views of Rakaposhi (7,788m), Ultar Sar, and the Karakoram range. Built in traditional Hunzai stone architecture, the Serena offers warm hospitality, a fine-dining restaurant serving local Hunzai cuisine, and lush terraced gardens bursting with apricot and cherry blossoms in spring.',
        pricePerNight: 25000,
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070',
        ],
        amenities: ['Free WiFi', 'Mountain View Restaurant', 'Roof Terrace', 'Room Service', 'Tour Desk', 'Heated Rooms', 'Airport Transfer', 'Traditional Hunzai Breakfast'],
        rating: 4.9,
        roomTypes: ['Deluxe Mountain View Room', 'Superior Suite', 'Royal Suite with Balcony'],
        address: 'Karimabad, Hunza 15700, Gilgit-Baltistan, Pakistan',
        phone: '+92-5811-457031',
        email: 'hunza@serena.com.pk',
        available: true,
      },
    }),

    // 2. Luxus Hunza Attabad Lake Resort
    prisma.hotel.create({
      data: {
        name: 'Luxus Hunza Attabad Lake Resort',
        location: 'Attabad Lake, Hunza, Gilgit-Baltistan',
        description:
          'Sitting directly on the shores of the world-famous turquoise Attabad Lake, this modern luxury resort is one of Pakistan\'s most photographed properties. Wake up to mirror-flat lake reflections of snow-capped peaks, enjoy a sunrise kayak session, and dine at the panoramic lakeside restaurant. The resort offers contemporary rooms with floor-to-ceiling windows framing the breathtaking lake.',
        pricePerNight: 30000,
        images: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070',
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2070',
        ],
        amenities: ['Lakeside Restaurant', 'Free WiFi', 'Kayaking & Boating', 'Swimming Pool', 'Spa', 'Bonfire Area', 'Mountain Bikes', 'Concierge'],
        rating: 4.8,
        roomTypes: ['Lake View Room', 'Premium Lake Suite', 'Honeymoon Cottage'],
        address: 'Attabad Lake, Gojal, Hunza, Gilgit-Baltistan',
        phone: '+92-322-5555888',
        email: 'attabad@luxushotels.com',
        available: true,
      },
    }),

    // 3. Shangrila Resort – Skardu
    prisma.hotel.create({
      data: {
        name: 'Shangrila Resort Hotel',
        location: 'Lower Kachura Lake, Skardu, Gilgit-Baltistan',
        description:
          'Pakistan\'s most iconic resort, Shangrila sits on the peaceful shores of Lower Kachura Lake in Skardu, famous for its replica of a China Airlines DC-3 aircraft converted into a lakeside restaurant. Known as the "Heaven on Earth" resort, it features traditional log-cabin style cottages nestled among weeping willows and rose gardens, with stunning mountain reflections on the lake at dawn.',
        pricePerNight: 20000,
        images: [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2070',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
        ],
        amenities: ['Lakeside Restaurant (DC-3 Aircraft)', 'Free WiFi', 'Boat Rides', 'Rose Garden', 'Room Service', 'Gift Shop', 'Heritage Museum', 'BBQ Lawn'],
        rating: 4.7,
        roomTypes: ['Garden Cottage', 'Lake View Room', 'Presidential Suite'],
        address: 'Shangrila Road, Lower Kachura, Skardu 16200',
        phone: '+92-5815-960500',
        email: 'info@shangrilaresorts.com.pk',
        available: true,
      },
    }),

    // 4. Serena Shigar Fort
    prisma.hotel.create({
      data: {
        name: 'Serena Shigar Fort Hotel',
        location: 'Shigar Valley, Skardu, Gilgit-Baltistan',
        description:
          'Rated as one of Asia\'s most unique heritage hotels, the Serena Shigar Fort is a 17th-century restored Balti royal palace turned boutique hotel in the Shigar Valley near Skardu. With only 20 rooms, each uniquely decorated with antique Balti furnishings, carved wooden ceilings, and courtyards with ancient mulberry trees, this UNESCO-recognized property offers an unparalleled immersion in Balti culture and history.',
        pricePerNight: 22000,
        images: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
        ],
        amenities: ['Heritage Fort Architecture', 'Fine Dining', 'WiFi', 'Balti Cultural Programs', 'Museum', 'Organic Garden', 'Mountain Trout Fishing', 'Library'],
        rating: 4.9,
        roomTypes: ['Heritage Room', 'Fort Suite', 'Royal Chamber'],
        address: 'Shigar Fort Road, Shigar, Skardu District',
        phone: '+92-5813-459011',
        email: 'shigar@serena.com.pk',
        available: true,
      },
    }),

    // 5. Gilgit Serena Hotel
    prisma.hotel.create({
      data: {
        name: 'Gilgit Serena Hotel',
        location: 'Gilgit City, Gilgit-Baltistan',
        description:
          'The premier hotel in Gilgit city and the ideal base for exploring all of Gilgit-Baltistan. Set in expansive mountain-view gardens, the Gilgit Serena offers 52 comfortable rooms with warm Gilgiti-style interiors, a top-rated restaurant serving Pakistani and continental cuisine, and a full travel desk to arrange jeeps, guides, and permits for onward adventures into Hunza, Nagar, Naltar, and beyond.',
        pricePerNight: 18000,
        images: [
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2070',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070',
        ],
        amenities: ['Free WiFi', 'Mountain View Restaurant', 'Travel Desk', 'Gym', 'Business Centre', 'Laundry Service', 'Currency Exchange', 'Secure Parking'],
        rating: 4.6,
        roomTypes: ['Standard Room', 'Deluxe Room', 'Executive Suite'],
        address: 'Airport Road, Gilgit 15100, Gilgit-Baltistan',
        phone: '+92-5811-920000',
        email: 'gilgit@serena.com.pk',
        available: true,
      },
    }),

    // 6. PC Legacy Hunza
    prisma.hotel.create({
      data: {
        name: 'PC Legacy Hunza',
        location: 'Aliabad, Hunza, Gilgit-Baltistan',
        description:
          'A premium addition to the Pearl Continental Legacy collection, PC Hunza brings big-city hospitality standards to the heart of the Hunza Valley. Featuring well-appointed rooms with Rakaposhi mountain views, a heated indoor pool, a fully equipped gym, and the legendary PC restaurant serving an extensive buffet, it\'s the go-to choice for discerning travelers who don\'t want to sacrifice comfort for adventure.',
        pricePerNight: 27000,
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070',
        ],
        amenities: ['Indoor Heated Pool', 'Gym & Spa', 'Free WiFi', 'Buffet Restaurant', 'Rooftop Terrace', 'Conference Hall', 'Tour Desk', 'Helipad Access'],
        rating: 4.7,
        roomTypes: ['Deluxe Room', 'Mountain View Suite', 'Junior Suite', 'Presidential Suite'],
        address: 'Aliabad, Hunza Valley 15700, Gilgit-Baltistan',
        phone: '+92-310-2222887',
        email: 'reservations@pchunza.com.pk',
        available: true,
      },
    }),

  ]);

  console.log(`✅ Created ${hotels.length} hotels`);

  // ─── Offers ────────────────────────────────────────────────────────────────
  const offers = await Promise.all([
    prisma.offer.create({
      data: {
        title: 'Summer Special – Hunza Valley Explorer',
        description:
          'Book our Hunza Valley Explorer 6-day tour before August and save 15%! Peak blossom season offer — apricot and cherry trees in full bloom.',
        image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070',
        price: 38250, // 15% off from 45,000
        discount: 15,
        validUntil: new Date('2026-08-31'),
        active: true,
        serviceType: 'TOUR',
        serviceId: tours[0].id,
      },
    }),
    prisma.offer.create({
      data: {
        title: 'Weekend 4x4 Prado Deal',
        description:
          'Rent the Land Cruiser Prado for a 3-day weekend and get 20% off! Perfect for a quick Hunza or Naltar escape from Gilgit.',
        image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=2070',
        price: 43200, // 20% off 3 days × 18,000
        discount: 20,
        validUntil: new Date('2026-09-30'),
        active: true,
        serviceType: 'CAR',
        serviceId: cars[1].id,
      },
    }),
    prisma.offer.create({
      data: {
        title: 'Shangrila Couple\'s Retreat',
        description:
          'Stay 3 nights at the iconic Shangrila Resort and get the 4th night free — a perfect romantic getaway on the shores of Lower Kachura Lake.',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2070',
        price: 60000, // 3 nights PKR 20,000 (4th free)
        discount: 25,
        validUntil: new Date('2026-12-31'),
        active: true,
        serviceType: 'HOTEL',
        serviceId: hotels[2].id,
      },
    }),
  ]);

  console.log(`✅ Created ${offers.length} offers`);
  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📝 Admin Credentials:');
  console.log('   Email: admin@travel.com');
  console.log('   Password: Admin@123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
