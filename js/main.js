var text = {
  "start": "Hello there.\n"
          +"Welcome to this terminal.\n"
          +"You can get started by typing \"/help\".\n"
          +"> ",
  "help": "/clear:\n"+
          "  type this command to clear the screen\n"+
          "/read:\n"+
          "  type this command to read the tutorials about programming\n"+
          "     type \"-p $\" after it to select the page you want to read\n"+
          "      example: /read -p 1 (read tutorial page one)\n"+
          "     type \"-i\" after it to display how may pages are there and the title of each page\n"+
          "      example: /read -i\n"+
          "     type \"-a\" after it to display the tutorials all at once\n"+
          "      example: /read -a\n"+
          "/help:\n"+
          "  type this command to get help\n"+
          "> "
}
var tutorial = [
['Directory\n',
' 1. Intro\n'+
' 2. Basics\n'+
' 3. The reason to learn programming\n'+
' 4. Quote\n'+
' 5. Get started\n'+
' 6. Your very first program\n'+
' 7. Tips and Advice (for the ones that want to learning programming)\n'+
' 8. Looking ahead\n'+
'> '
],
['Intro\n',
'Nowadays, technology is everywhere.\n'+
'Computers, phones, and smartwatches are all around us,\n'+
'but do you know how they work?\n\n'+
'The answer is programming.\n'+
'> '
],
['Basics\n',
'Programming is the way how human communicates with the devices or computers in general.\n'+
'Programming languages are the specific languages for programming.\n'+
'They are like English or Spanish,\n'+
'but the difference is that the programming languages are used to talk to the machines not human.\n'+
'> '
],
['The reason to learn programming\n',
'1. We are now living in a world full of technology. It is necessary for us to learn how to use these tools.\n'+
'2. It is a way of problem solving, a way of thinking.\n\n'+
'clarification:\n'+
'programming is not difficult at all.\n'+
'Everyone is capable of learning it,\n'+
'and it will become a powerful skill in the future.\n'+
'> '
],
['Quote\n',
'“Everybody in this country should learn to program a computer, because it teaches you how to think.”\n'+
'                                                                                             — Steve Jobs\n'+
'> '
],
['Get started\n',
'list of things you need to start programming:\n'+
'  1. Some basic understanding of math\n'+
'  2. A clear mind\n'+
'  3. A computer\n'+
'> '
],
['Your very first program\n',
'Let’s write our first program.\n'+
'  Step one: open "terminal" on your computer.\n'+
'  Step two: type "python".\n'+
'  Step three: type "print("hello world")"\n'+
'You should see "hello world" coming up on your screen.\n'+
'Congratulations! You have finished your first program!\n'+
'> '
],
['Tips and advice (for the ones that want to learn programming)\n',
'It works the best if you start learning programming by building a project not just reading books.\n'+
'Start with "python" or "javascript" while you learn programming.\n'+
'Also you can try "Scratch", because it is easier for you to get started with.\n'+
'Java is also an important language to learn after you understand the basics.\n'+
'(computer science AP in high school is focusing on learning Java)\n'+
'> '
],
['Looking ahead\n',
'You can see programmer as the wizard of the 21st century.\n'+
'The new exciting fields like artificial intelligence(AI) and the internet of things(IoT) continue changing our lives.\n'+
'More countries start to realize the importance of teaching programming. (UK for example)\n'+
'> '
]
]
var intro = true;
var help = true;
var count = text.start.length;
var stop = true;
var reading = false;
var done  = true;

function displayText(text) {
  var limit = text.length;
  var count = 0;
  var add = setInterval(function () {
    $("#main").val($("#main").val() + text[count]);
    count += 1;
    console.log("add");
    if(count == limit) {
      clearInterval(add);
    }
  },50);
}

function clearScreen() {
  $("#main").val("> ");
}

function read_all(page_num) {
  reading = true;
  console.log("read_all: "+page_num);
  if (page_num >= tutorial.length+1) {
    clearScreen();
    reading = false;
    stop = false;
    count = $("#main").val().length;
    return;
  }else {
    done = false;
    var content;
    if (page_num == 0) {
      content = tutorial[page_num][0]+tutorial[page_num][1]+"type any number between 1-8 to read the content, or press \"q\" to quit to the terminal.\n> ";
    }else {
      content = page_num+". "+tutorial[page_num][0]+tutorial[page_num][1];
    }
    clearScreen();
    displayText(content);
    setTimeout(function () {
      done = true;
    },content.length*50+10);
  }
}

function getInput() {
  setInterval(function () {
    if (stop == false) {
      var command = $("#main").val().substr(count,$("#main").val().length);
      if (command[command.length-1] == "\n") {
        if (command == "/help\n") {
          stop = true;
          displayText(text["help"]);
          setTimeout(function () {
            count = $("#main").val().length;
            stop = false;
            console.log(count);
          },text["help"].length*50+10);
        }else if (command == "/clear\n") {
          stop = true;
          clearScreen();
          count = $("#main").val().length;
          stop = false;
        }else if (command.substr(0,5) == "/read" && command[command.length-1] == "\n") {
          stop = true;
          console.log("read");

          if (command.length == 6 || command == "/read -i\n") {
            displayText(tutorial[0][0]+tutorial[0][1]);
            setTimeout(function () {
              count = $("#main").val().length;
              stop = false;
              console.log(count);
            },(tutorial[0][0]+tutorial[0][1]).length*50+10);
          }else if (command.substring(0,8) == "/read -p" && command.length == 11) {
            var page_num = parseInt(command[9]);
            if (page_num < tutorial.length) {
              displayText(tutorial[page_num][0]+tutorial[page_num][1]);
              setTimeout(function () {
                count = $("#main").val().length;
                stop = false;
                console.log(count);
              },(tutorial[page_num][0]+tutorial[page_num][1]).length*50+10);
            }else {
              displayText("Wrong page number!!!\nPlease try again.\n> ");
              setTimeout(function () {
                count = $("#main").val().length;
                stop = false;
                console.log(count);
              },("Wrong page number!!!\nPlease try again.\n> ").length*50+10);
            }
          }else if (command.length == 6 || command == "/read -a\n") {
            read_all(0);


          }else {
            displayText("Error!!!\nPlease try again.\n> ");
            setTimeout(function () {
              count = $("#main").val().length;
              stop = false;
              console.log(count);
            },("Error!!!\nPlease try again.\n> ").length*50+10);
          }
        }else if (command == "\n") {
          stop = true;
          displayText('> ');
          setTimeout(function () {
            count = $("#main").val().length;
            stop = false;
            console.log(count);
          },('> ').length*50+10);
        }else {
          stop = true;
          displayText('Error!!!\nPlease try again.\n> ');
          setTimeout(function () {
            count = $("#main").val().length;
            stop = false;
            console.log(count);
          },('Error!!!\nPlease try again.\n> ').length*50+10);
        }
      }

    }

  },50);

}



document.onkeydown = function (e) {
  if (count == $("#main").val().length && e.keyCode == 8) {
    e.preventDefault();
    return false;
  }
  if ((stop == true && reading == false) || (reading == true && done == false)) {
    e.preventDefault();
    console.log("reading:"+reading+"\ndone:"+done);
    return false;
  }else if (reading == true && done == true) {
    console.log("test");
    if (e.keyCode >= 49 && e.keyCode <= 56) {
      read_all(e.keyCode - 48);
    }else if (e.keyCode == 81) {
      read_all(100);
    }
    return false;
  }

}

$('textarea')
    .attr('unselectable', 'on')
    .css('-webkit-user-select', 'none')
    .css('-moz-user-select', 'none')
    .css("-ms-user-select","none")
    .css("-o-user-select","none")
    .css("user-select",'none')
    .on('selectstart', false)
    .on('mousedown', false);


displayText(text.start);
setTimeout(function () {
  stop = false;
  getInput();
},text.start.length*50+10);
