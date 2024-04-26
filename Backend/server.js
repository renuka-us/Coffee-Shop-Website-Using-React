const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs'); // Import the fs module
const nodemailer = require('nodemailer');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
mongoose.connect('mongodb://localhost:27017/Coffee-Shop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


const db = mongoose.connection;

// // Create a schema for your data
const menuSchema = new mongoose.Schema({
      title: String,
      price: String, // Consider changing this to a Number type if it stores numerical values
      text: String,
      imageData: Buffer,
    });
    
// // Create a model based on the schema
const Menu = mongoose.model('menus', menuSchema);


// Function to read image file as buffer
function getImageBuffer(imagePath) {
  return fs.readFileSync(imagePath);
}

// Function to save product data to the database
async function saveProduct(title, price, text, imagePath) {
  try {
    const imageData = getImageBuffer(imagePath);
    const menu = new Menu({
      title,
      price,
      text,
      imageData,
    });
    await menu.save();
    console.log('Menu saved successfully');
  } catch (error) {
    console.error('Error saving product:', error);
  }
}

// API endpoint to save a product
app.post('/api/save-product', async (req, res) => {
    const { title, price, text, imagePath } = req.body;
    console.log(imagePath);
    try {
       const imageData = getImageBuffer(imagePath);
       const menu = new Menu({
         title,
         price,
         text,
         imageData,
       });
       await menu.save();
       res.status(200).send('Menu saved successfully');
    } catch (error) {
       console.error('Error saving product:', error);
       res.status(500).send('Error saving product');
    }
   });
// // Usage example
// saveProduct('Espresso', '$25', 'An intense and rich shot of espresso, featuring a bold flavor profile with a hint of sweetness and a lingering aftertaste.', 'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/Menu_images/menu-2.jpg');

// saveProduct('Cappuccino', '$28', 'Indulge in the creamy delight of our cappuccino, crafted with freshly brewed espresso and topped with a generous layer of frothy milk foam.', 'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/Menu_images/menu-3.jpg');

// saveProduct('Latte', '$30', 'Experience the smooth and velvety texture of our latte, made with a perfect balance of steamed milk and rich espresso, creating a comforting beverage with every sip.', 'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/Menu_images/menu-4.jpg');

// saveProduct('Mocha', '$27', 'Indulge in the decadent flavor of our mocha, combining the richness of espresso with the sweetness of chocolate, topped with whipped cream for a delightful treat.', 'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/Menu_images/menu-5.jpg');

// saveProduct('Americano', '$26', 'Savor the smooth and bold taste of our Americano, made by diluting a shot of espresso with hot water, offering a satisfying coffee experience with every sip.', 'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/Menu_images/menu-6.jpg');

// saveProduct('Macchiato', '$29', 'Enjoy the simplicity and elegance of our macchiato, featuring a shot of espresso "stained" with a small amount of frothy milk, creating a harmonious blend of flavors in every cup.', 'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/Menu_images/menu-7.jpg');



// Define API endpoint to fetch menu items
app.get('/api/menu', async (req, res) => {
    try {
        // Fetch all menu items from the database
        const menuItems = await Menu.find().lean();

        // If no menu items found, return an empty array
        if (!menuItems) {
            return res.status(404).json({ message: 'Menu items not found' });
        }

        // Send the menu items as a response
        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/', async (req, res) => {
    res.json({"Renuka":"Sarmokdam"});
   console.log("Renuka");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const testimonialSchema = new mongoose.Schema({
    clientName: String,
    profession:String,
    review: String,
    photo: Buffer, // Assuming the photo will be stored as a URL
});

// Create a model based on the schema
const Testimonial = mongoose.model('testimonials', testimonialSchema);



// Function to save testimonial data to the database

async function saveTestimonial(clientName, profession, review, photoPath) {
    try {
        const photoData = getImageBuffer(photoPath);
        const testimonial = new Testimonial({
            clientName,
            profession,
            review,
            photo: photoData,
        });
        await testimonial.save();
        console.log('Testimonial saved successfully');
    } catch (error) {
        console.error('Error saving testimonial:', error);
    }
}
// API endpoint to save a testimonial
app.post('/api/save-testimonial', async (req, res) => {
    const { clientName, profession, review, photoPath } = req.body;
    try {
       const photoData = getImageBuffer(photoPath);
       const testimonial = new Testimonial({
         clientName,
         profession,
         review,
         photo: photoData,
       });
       await testimonial.save();
       res.status(200).send('Testimonial saved successfully');
    } catch (error) {
       console.error('Error saving testimonial:', error);
       res.status(500).send('Error saving testimonial');
    }
   });

// // Usage example
// saveTestimonial(
//     'John Doe',
//     'Coffee Connoisseur',
//     'The coffee at this shop is simply amazing! I ve been a regular customer for years and never been disappointed.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-1.jpg'
// );

// saveTestimonial(
//     'Jane Smith',
//     'Business Owner',
//     'As a business owner, I appreciate the quality and consistency of the coffee served here. Highly recommended!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-2.jpg'
// );
// // Testimonial 2
// saveTestimonial(
//     'Michael Johnson',
//     'Marketing Manager',
//     'Ive tried many coffee shops in the area, but none compare to this one. The coffee is always fresh and delicious!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-3.jpg'
// );

// // Testimonial 3
// saveTestimonial(
//     'Sarah Thompson',
//     'Freelance Writer',
//     'Working remotely can be tough, but having a good coffee shop nearby makes all the difference. This place is my go-to spot!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-4.jpg'
// );

// // Testimonial 4
// saveTestimonial(
//     'David Garcia',
//     'Software Engineer',
//     'I love the cozy atmosphere of this coffee shop. Its the perfect place to relax and enjoy a cup of coffee while I work.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-5.jpg'
// );

// // Testimonial 5
// saveTestimonial(
//     'Emily White',
//     'Student',
//     'I come here every day after class to study and unwind. The staff is friendly, and the coffee is top-notch!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-6.jpg'
// );

// // Testimonial 6
// saveTestimonial(
//     'Alex Rodriguez',
//     'Fitness Trainer',
//     'I start every morning with a visit to this coffee shop. Their coffee gives me the energy boost I need for my workouts!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-7.jpg'
// );

// // Testimonial 7
// saveTestimonial(
//     'Olivia Moore',
//     'Artist',
//     'The creativity flows as freely as the coffee here. Its my favorite spot to brainstorm new ideas and projects.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-8.jpg'
// );

// // Testimonial 8
// saveTestimonial(
//     'Daniel Lee',
//     'Teacher',
//     'This coffee shop has become a staple in my daily routine. The quality of their coffee is unmatched!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-9.jpg'
// );

// // Testimonial 9
// saveTestimonial(
//     'Sophia Clark',
//     'Fashion Designer',
//     'I draw so much inspiration from the ambiance of this coffee shop. Its the perfect place to recharge and get inspired.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-10.jpg'
// );

// // Testimonial 10
// saveTestimonial(
//     'Ethan Wilson',
//     'Photographer',
//     'I often meet clients here for coffee meetings, and they always comment on how great the coffee is. Its a win-win!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-11.jpg'
// );
// // Testimonial 10
// saveTestimonial(
//     'Ethan Wilson',
//     'Photographer',
//     'I often meet clients here for coffee meetings, and they always comment on how great the coffee is. Its a win-win!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-12.jpg'
// );
// // Testimonial 10
// saveTestimonial(
//     'Ethan Wilson',
//     'Photographer',
//     'I often meet clients here for coffee meetings, and they always comment on how great the coffee is. Its a win-win!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-13.jpg'
// );
// // Testimonial 10
// saveTestimonial(
//     'Ethan Wilson',
//     'Photographer',
//     'I often meet clients here for coffee meetings, and they always comment on how great the coffee is. Its a win-win!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-14.jpg'
// );
// // Testimonial 10
// saveTestimonial(
//     'Ethan Wilson',
//     'Photographer',
//     'I often meet clients here for coffee meetings, and they always comment on how great the coffee is. Its a win-win!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-15.jpg'
// );
// // Testimonial 10
// saveTestimonial(
//     'Ethan Wilson',
//     'Photographer',
//     'I often meet clients here for coffee meetings, and they always comment on how great the coffee is. Its a win-win!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-16.jpg'
// );
// // Testimonial 10
// saveTestimonial(
//     'Ethan Wilson',
//     'Photographer',
//     'I often meet clients here for coffee meetings, and they always comment on how great the coffee is. Its a win-win!',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/testimonial-17.jpg'
// );

// // Testimonial 11
// saveTestimonial(
//     'Ava Anderson',
//     'Travel Blogger',
//     'Ive visited coffee shops all around the world, but this one stands out for its exceptional service and quality coffee.',
//     'https://example.com/photo12.jpg'
// );

// // Testimonial 12
// saveTestimonial(
//     'Noah Martinez',
//     'Financial Analyst',
//     'This coffee shop is my secret weapon for staying productive during long workdays. Their coffee keeps me focused!',
//     'https://example.com/photo13.jpg'
// );

app.get('/api/testimonials', async (req, res) => {
    try {
        // Fetch all menu items from the database
        const testimonialItems = await Testimonial.find().lean();

        // If no menu items found, return an empty array
        if (!testimonialItems) {
            return res.status(404).json({ message: 'Testimony items not found' });
        }

        // Send the menu items as a response
        res.json(testimonialItems);
    } catch (error) {
        console.error('Error fetching Testimony items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const coffeeServiceSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: Buffer, // Store image as buffer
    icon: Buffer, // Store icon as buffer
});

const CoffeeService = mongoose.model('coffeeServices', coffeeServiceSchema);
// Function to save service data to the database
async function saveService(title, description, imagePath, iconPath) {
    try {
        // Read the image files as buffers
        const imageData = getImageBuffer(imagePath);
        const iconData = getImageBuffer(iconPath);

        // Create a new service instance
        const service = new CoffeeService({
            title,
            description,
            image: imageData, // Assign the image buffer to the image field
            icon: iconData, // Assign the icon buffer to the icon field
        });

        // Save the service to the database
        await service.save();
        console.log('Service saved successfully');
    } catch (error) {
        console.error('Error saving service:', error);
    }
}
// API endpoint to save a service
app.post('/api/save-service', async (req, res) => {
    const { title, description, imagePath, iconPath } = req.body;
    try {
       const imageData = getImageBuffer(imagePath);
       const iconData = getImageBuffer(iconPath);
       const service = new CoffeeService({
         title,
         description,
         image: imageData, // Assign the image buffer to the image field
         icon: iconData, // Assign the icon buffer to the icon field
       });
       await service.save();
       res.status(200).send('Service saved successfully');
    } catch (error) {
       console.error('Error saving service:', error);
       res.status(500).send('Error saving service');
    }
   });
   
// // Usage example
// saveService(
//     'Outdoor Seating',
//     'Take advantage of our outdoor seating area and enjoy your coffee al fresco. Bask in the sunshine or relax under the stars as you savor your favorite drink in the fresh air.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/service-13.jpg',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/icons/service-13.svg'
// );
// saveService(
//     'Free Wi-Fi',
//     'Stay connected while you enjoy your coffee with our complimentary Wi-Fi service. Whether youre catching up on work or scrolling through social media, you can stay connected from the comfort of our coffee shop.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/service-17.jpg',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/icons/service-17.svg'
// );
// saveService(
//     'Best Quality Coffee',
//     'Enjoy our premium quality coffee, crafted from the finest beans sourced from around the world. Indulge in the rich aroma and distinct flavors that set our coffee apart.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/service-3.jpg',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/icons/service-3.svg'
// );

// saveService(
//     'Online Table Booking',
//     'Foster connections and build community at our coffee shops events and gatherings. From book clubs to art exhibitions, our space serves as a hub for bringing people together and fostering meaningful interactions.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/service-4.jpg',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/icons/service-4.svg'
// );

// saveService(
//     'Barista Training Workshops',
//     'Foster connections and build community at our coffee shops events and gatherings. From book clubs to art exhibitions, our space serves as a hub for bringing people together and fostering meaningful interactions.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/service-11.jpg',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/icons/service-11.svg'
// );
// saveService(
//     'Seasonal Menu Offerings',
//     'Foster connections and build community at our coffee shops events and gatherings. From book clubs to art exhibitions, our space serves as a hub for bringing people together and fostering meaningful interactions.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/service-15.jpg',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/icons/service-15.svg'
// );
// saveService(
//     'Community Events and Gatherings',
//     'Foster connections and build community at our coffee shops events and gatherings. From book clubs to art exhibitions, our space serves as a hub for bringing people together and fostering meaningful interactions.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/service-16.jpg',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/icons/service-16.svg'
// );
// saveService(
//     'Live Music Events',
//     'Foster connections and build community at our coffee shops events and gatherings. From book clubs to art exhibitions, our space serves as a hub for bringing people together and fostering meaningful interactions.',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/service-10.jpg',
//     'C:/Users/renuka.sarmokdam/OneDrive - Parkar Digital/Documents/Coffee-Shop-Website-Using-React/coffee-shop/public/assets/img/icons/service-10.svg'
// );

app.get('/api/services', async (req, res) => {
    try {
        // Fetch all services from the database
        const services = await CoffeeService.find().lean();

        // If no services found, return an empty array
        if (!services) {
            return res.status(404).json({ message: 'Services not found' });
        }

        // Send the services as a response
        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const reservationSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    time: String,
    numberOfPeople: Number,
  });
  
  // Define Reservation model
  const Reservation = mongoose.model('Reservations', reservationSchema);
  
//  
 // API endpoint to create a reservation
  app.post('/api/confirmReservation', async (req, res) => {
    try {
      const { name, email, date, time, numberOfPeople } = req.body;
      const reservation = new Reservation({
        name,
        email,
        date,
        time,
        numberOfPeople,
      });
      await reservation.save();
      res.status(201).json({ message: 'Reservation successful' });
    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).json({ message: 'Reservation failed' });
    }
  });
  

// Define schema for user emails
const userEmailSchema = new mongoose.Schema({
    email: String
  });

// Create model for user emails
const UserEmail = mongoose.model('UserEmail', userEmailSchema);
app.post('/api/userEmail', async (req, res) => {
    try {
        const { email } = req.body;
    
        // Check if the email already exists
        const existingEmail = await UserEmail.findOne({ email });
        if (existingEmail) {
          return res.status(400).json({ message: 'Already subscribed' });
        }
    
        // Create a new document with the user's email and save it to the database
        const newUserEmail = new UserEmail({ email });
        await newUserEmail.save();
    
        res.status(201).json({ message: 'Email saved successfully' });
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
     }
  });


 
// Define the contactSchema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});
 
const Contact = mongoose.model('Contact', contactSchema);
  // API endpoint to submit form data and send an email
  app.post('/api/submit-contact-form', async (req, res) => {
      console.log('HII');
      try {
          // Extract form data from the request body
          const { name, email, subject, message } = req.body;
   
          // Create a test account with Nodemailer
          let testAccount = await nodemailer.createTestAccount();
   
          // Create a transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false, // Use `true` for port 465, `false` for all other ports
              auth: {
                  user: testAccount.user,
                  pass: testAccount.pass,
              },
          });
   
          // Set up email data
          let mailOptions = {
              from: `Email: ${email}`, // sender address
              to: "renukas9688@gmail.com", // list of receivers
              subject: `New Contact Form Submission: ${subject}`, // Subject line
              text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
              html: `<p>Name: ${name}<br>Email: ${email}<br>Message: ${message}</p>`, // html body
          };
   
          // Send mail with defined transport object
          let info = await transporter.sendMail(mailOptions);
   
          // Log the message ID and the URL to the sent email in the Ethereal web interface
          console.log("Message sent: %s", info.messageId);
          console.log("View the sent email at:", nodemailer.getTestMessageUrl(info));
   
          // Save data to MongoDB using Mongoose
          const newContact = new Contact({ name, email, subject, message });
          await newContact.save();
          console.log("Data saved to MongoDB with _id:", newContact._id);
   
          res.status(200).send('Form submitted successfully and email sent');
      } catch (error) {
          console.error("Error sending email or saving to MongoDB:", error);
          res.status(500).send('Error submitting form');
      }
  });
   

module.exports = mongoose.connection; 