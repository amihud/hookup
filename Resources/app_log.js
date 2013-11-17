//set the default background color
Titanium.UI.setBackgroundColor('#FFF');
 
//create tab group
var tabGroup = Titanium.UI.createTabGroup();
 
 
//create our registration window
var registerWindow = Titanium.UI.createWindow({
  title: 'Register',
  backgroundColor: '#FFF',
  url: "RegisterWindow.js"
});
 
 
//create our login window
var loginWindow = Titanium.UI.createWindow({
  title: 'Login',
  backgroundColor: '#FFF',
  url: "LoginWindow.js"
});
 
 
//create the tab to hold the registration window
var registerTab = Titanium.UI.createTab({
 
  icon: 'register.png',
  title: 'Register',
  window: registerWindow
});
 
 
//create the tab to hold the login window
var loginTab = Titanium.UI.createTab({
  icon: 'login.png',
  title: 'Login',
  window: loginWindow
});
 
 
//add our tabs to the tabgroup
tabGroup.addTab(registerTab);
tabGroup.addTab(loginTab);
 
 
//display the tabgroup
tabGroup.open();
