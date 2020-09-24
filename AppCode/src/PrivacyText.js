import React from 'react'

import {
  Text,
  StyleSheet
} from 'react-native';

function PrivacyText(){
    return (
        <>
          <Text style={styles.mainTitle}>Privacy Policy </Text>

          <Text style={styles.centerText}>The internet is an amazing tool. It has the power to change the way we live, and we’re starting to see that potential today. With only a few clicks, you can follow the news, look up facts, buy goods and services, and communicate with others from around the world. It’s important to THE DEVELOPERS to help users to retain their privacy when they take advantages of the services provided.
          We believe your business is no one else’s, but your own. Your privacy is important to you and to us. So we’ll protect the information you share. To protect your privacy, THE DEVELOPERS follow different principles in accordance with worldwide practices for customer’s privacy and data protection.</Text>

          <Text style={styles.centerText}> - We’ll use state-of-the-art security measures to protect your information from unauthorized users. </Text>

          <Text style={styles.headerText}>Notice</Text>
          <Text style={styles.centerText}>
          We will ask you when we need information that personally identifies you (personal information) or allows us to contact you. Generally, this information is requested when you create a Registration ID on the application or website or when you download free software, enter a contest, order email newsletter or join a limited-access premium site. We use your personal Information for four primary purposes:
          </Text>
          <Text style={styles.centerText}> - To make the application or website easier for you to use by not having to enter information more than once.</Text>
          <Text style={styles.centerText}> - To help you quickly find software, services or information.</Text>
          <Text style={styles.centerText}> - To help us create content most relevant to you.</Text>
          <Text style={styles.centerText}> - To alert you of product upgrades, special offers, updated information and other new services from THE DEVELOPERS.</Text>

          <Text style={styles.headerText}>Consent</Text>

          <Text style={styles.centerText}>If you choose not to register or provide personal information, you can still use most of our application, but you will not be able to access areas that require location services.
          If you decide to share your location, you will be able to share your current location. 
          </Text>
          <Text style={styles.headerText}>Access</Text>

          <Text style={styles.centerText}>We will provide you with the means to ensure that your personal information is correct and current. You may review and update this information at any time under settings, you can:</Text>
          <Text style={styles.centerText}> - View and edit personal information you have already given us.</Text>
          <Text style={styles.centerText}> - Tell us whether you want us to send you marketing information, or whether you want third parties to send you their offers by postal mail.</Text>

          <Text style={styles.headerText}>Security</Text>
          <Text style={styles.centerText}>
          THE DEVELOPERS have taken strong measures to protect the security of your personal information and to ensure that your choices for its intended use are honored. We take strong precautions to protect your data from loss, misuse, unauthorized access or disclosure, alteration, or destruction. 
          When you place orders or access your personal account information, you’re utilizing secure server software SSL, which encrypts your personal information before it’s sent over the Internet. SSL is one of the safest encryption technologies available. 
          THE DEVELOPERS strictly protects the security of your personal information and honors your choices for its intended use. We carefully protect your data from loss, misuse, unauthorized access or disclosure, alteration, or destruction.
          Your personal information is never shared outside the company without your permission, except under conditions explained above. Inside the company, data is stored in password-controlled servers with limited access. Your information may be stored and processed in USA or any other country where THE DEVELOPERS, its subsidiaries, affiliates or agents are located.
          You also have a significant role in protecting your information. No one can see or edit your personal information without knowing your user name and password, so do not share these with others.
          </Text>
          <Text style={styles.headerText}>Enforcement</Text>
          <Text style={styles.centerText}>
          If for some reason you believe THE DEVELOPERS have not adhered to these principles, please notify us by email at [n-k@live.com], and we will do our best to determine and correct the problem promptly. Be certain the words Privacy Policy are in the Subject line.
          </Text>
          <Text style={styles.centerText}>
          Electronic Product Registration
          When you buy and install a new product we may ask you to register your purchase electronically. When you do, we merge your registration information with any information you’ve already left with us (we call that information your personal profile). If you haven’t previously registered with us, we create a personal profile for you from your product registration information. If you ever want to review or update that information, you can visit Settings, click on Change Password, and edit any of the Personal Information in your profile. If you haven’t already created a Registration ID, we will ask you to do so. This ensures that only you can access your information.
          </Text>
          <Text style={styles.centerText}>
          Customer Profiles
          As mentioned above, every registered customer has a unique id. Each profile is assigned a unique identification number, which helps us ensure that only you can access your account. When you register, we create your profile, assign a personal identification number, then send this personal identification number back to your hard drive in the form of a cookie, which is a very small bit of code. This code is uniquely yours. It is your passport to seamless travel across THE DEVELOPERS, allowing you to fill out registration forms with information you’ve already provided. Even if you switch computers, you won’t have to re-register – just use your Login information to identify yourself.
          </Text>
          <Text style={styles.centerText}>
          WHAT WE DO WITH THE INFORMATION YOU SHARE
          We occasionally hire other companies to provide limited services on our behalf, including answering customer questions about products or services, sending postal mail and processing event registration. We will only provide those companies the information they need to deliver the service, and they are prohibited from using that information for any other purpose.
          THE DEVELOPERS will disclose your personal information, without notice, only if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with the legal processes served on THE DEVELOPERS; (b) protect and defend the rights or property of THE DEVELOPERS and its family of Websites, and applications, (c) act in urgent circumstances to protect the personal safety of users on the THE DEVELOPERS application, its Website, or the public. 
          </Text>
          <Text style={styles.centerText}>The application stores associates an anonymous ID using Google’s Cloud Firebase Database to authenticate the user. The information stored includes a unique device ID, and the longitude and latitude provided at 2 decimals to ensure the users exact location remains anonymous. 
          The data is only stored once a user indicates by pressing a button that they have been identified to have to virus. Otherwise, no sensitive information is shared on the database.  
          </Text>
          <Text style={styles.centerText}>
            The latitude and longitude are shared to create a geographical fence, informing users within the fence to take extra precautions that the virus has been located within a 3 km radius. 
          Once the user presses shares his location with others, the data is stored on the database until the user presses the button that they have been tested negative to have the virus and have successfully recovered from the virus. 
          </Text>
          <Text style={styles.centerText}>
            Because the information is stored anonymously on the database, there is no way to retrieve the information a specific user has sent. 
          A user has the right to change the information provided by pressing the ‘Tested Negative’ button and pressing the ‘Tested Positive’ button when they are within, their desired location. 
          </Text>
          <Text style={styles.centerText}>
            If you have any questions, please contact the developerS and publisher Noah Kanyo at n-k@live.ca. 
          </Text>
        </>
    )
}

const styles = StyleSheet.create({
    centerText: {textAlign: 'justify'},
    headerText: {textAlign: 'center', fontSize: 16, marginVertical: 10},
    mainTitle: {textAlign: 'center', fontSize: 20, marginBottom: 10}
});



export default PrivacyText