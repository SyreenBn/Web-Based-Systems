 import java.net.ServerSocket;
import java.net.Socket;
import java.net.URLConnection;
import java.io.PrintWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;
import java.text.SimpleDateFormat;
import java.text.DateFormatSymbols;

/** 
 * A single-thread web server that returns files located in
 * the same directory as the Java class file for the server.
 */

//In this homework, I helped Eitaa to understand the main idea of the server client. Also, she asked me some question about the basic of Java. 
// In this homewrk, I do not know why I could not test the server through the browser. 
public class WebServer {
 
    public static void main (String args[]) {

	// Announce that the server is starting.
	System.out.println("Starting server on port 8080.");
	
        try {
            // Create server socket bound to port 8080
            ServerSocket mySocket = new ServerSocket(8080);

            // Repeat until someone kills us (Ctrl-C at the console)
            while (true) {

                // Listen for a connection
                Socket yourSocket = mySocket.accept();

                // If we reach this line, someone connected to our port
		// and has sent us an HTTP request!

		// Create the connection input and output objects.
		// socketIn allows us to read the request from the client
		// a line at a time by calls to the readLine() method.
		// socketOut allows us to write the response to the client
		// a line at a time by calls to the println() method.
		BufferedReader socketIn = 
		    new BufferedReader(
 		        new InputStreamReader(yourSocket.getInputStream()));
		PrintWriter socketOut = 
		    new PrintWriter(yourSocket.getOutputStream());

                // Read the first line of the HTTP request and extract the
		// name of the file to be served.  Assume that the
		// first line of the request is of the form: 
		// GET /filename HTTP/1.1
		// Note that the leading / is not part of the file name.
		// After reading the file name, print it to the console.
		// >>> YOUR CODE TO ACCOMPLISH THIS GOES NEXT <<<
            String line = socketIn.readLine(); // Read the first line from the client
			String file_name = "";
			if (!(line.isEmpty())){
				String[] line_list = line.split(" "); // to take the name of the file 
				file_name = line_list[1].substring(1); // to remove / from the file name
				System.out.println("The file " + file_name + " is requested by the client");
			}    
		// Using one or more methods of the java.io.File class,
		// https://docs.oracle.com/javase/8/docs/api/java/io/File.html
		// check to see if the request's filename exists in the
		// directory containing the server's Java class file
		// (that is, look for the file by its name alone, not
		// by using a file path involving folders).
		// If it does exist, output the first line of the response as
		// HTTP/1.1 200 OK
		// If it does not, output the first line of the response as
		// HTTP/1.1 404 Not Found
		// >>> YOUR CODE TO ACCOMPLISH THIS GOES NEXT <<<
			File file = new File(file_name);
			Boolean foundFile = file.exists();
			if(foundFile){
				socketOut.println("HTTP/1.1 200 OK ");
			} else {
				socketOut.println("HTTP/1.1 404 Not Found");
			}
        // Write the header fields of the response followed by
		// a blank line.  We will send only two header fields:
		// Date and Content-Type.  The value of the Date field
		// will be the current date and time in a particular
		// format.
                SimpleDateFormat formatter = 
                    new SimpleDateFormat("E, dd MMM yyyy HH:mm:ss zzz",
                                         new DateFormatSymbols(Locale.US));
                formatter.setTimeZone(TimeZone.getTimeZone("GMT"));
                String dateTime = formatter.format(new Date());
		socketOut.println("Date: " + dateTime);
		socketOut.println("Content-Type: text/html");
		socketOut.println();

		// Write the body of the HTTP response as follows.  If
                // the requested file exists, copy the file line by
                // line to the body of the HTTP response by
                // readLine-ing from the file object and println-ing
                // to the socketout object.  If the file does not
                // exist, the body of the response should consist of
                // only the following line of HTML:
                // <html><body><h1>File Not Found</h1></body></html>
		// Recommendation: If the file exists, create an
		// object fileReader that can be used to read from the
		// File object "file" as follows:
		//   BufferedReader fileReader =
		//    new BufferedReader(new FileReader(file));
		// Calls to readLine() method on this object will return
		// one line of the file at a time.
                // >>> YOUR CODE TO ACCOMPLISH THIS GOES NEXT <<<
			
			if (foundFile){
				BufferedReader fileReader =
				new BufferedReader(new FileReader(file));
				String fileCurrentLine = fileReader.readLine();
				do {
					socketOut.println(fileCurrentLine);
					fileCurrentLine = fileReader.readLine();
				}while (fileCurrentLine != null);
				fileReader.close();
			} else {
				socketOut.println("<html><body><h1>File Not Found</h1></body></html>");
			}
        // Done with this connection. Make sure that the
		// entire response has been sent, then close the I/O
		// objects and the TCP connection.
		socketOut.flush();
		socketOut.close();
		socketIn.close();
                yourSocket.close();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return;
    }
}
