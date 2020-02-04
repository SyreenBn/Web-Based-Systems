import java.net.URL;
import java.net.Socket;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.PrintWriter;

import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JEditorPane;
import javax.swing.SwingUtilities;
import java.awt.Dimension;

public class WebClient {

    public static void main(String[] args) {

        try {

            // Obtain from the command line a URL that the user has
	    // specified and use it to create a Java URL object.
	    // See https://docs.oracle.com/javase/8/docs/api/java/net/URL.html
	    // for methods that URL objects support.
            URL url = new URL(args[0]);

	    // Create a TCP connection to the server having the fully
	    // qualified domain name that is part of this URL at the
	    // specified port (or at the default port for the URL scheme
	    // used, if no port is specified in the URL).
	    String server = url.getHost();
	    int port = url.getPort();
	    if (port < 0) {
		port = url.getDefaultPort();
	    }
	    Socket connection = new Socket(server, port);

	    // Create an HTTP GET request from the specified URL and
	    // send it to the server.  Sending is accomplished by
	    // "printing" to the connection object's output stream and
	    // then flushing to ensure that everything in the print
	    // buffer is sent immediately.
	    PrintWriter out = 
		new PrintWriter(connection.getOutputStream());
	    String requestURI = url.getFile();
	    if (requestURI.length() == 0) {
		requestURI = "/"; // If no path in URL, must send '/' to server
	    }
	    out.println("GET " + requestURI + " HTTP/1.1");
	    out.println("Host: " + url.getHost()); // Required header
	    out.println("Connection: close");      // Tells server to close
	                                           // TCP connection when done
	                                           // with its HTTP response
	    out.println(); // Must follow header fields with blank line
	    out.flush();

	    // Create object "in" that can be used to read the server's
	    // HTTP response by calling readLine() method, which returns
	    // one line at a time and null when there are no more lines.
	    // If the string returned by readLine() has length 0, this
	    // indicates that a blank line has been read.
	    BufferedReader in = 
		new BufferedReader(
		    new InputStreamReader(connection.getInputStream()));

	    // Read and print to the console the first line of the response.
	    String firstLine = in.readLine();
	    System.out.println(firstLine);

	    // First line of the response contains the 3-digit status
	    // code beginning at character position 9.  Code 200 means
	    // that the request was successful.  Extract this code and
	    // store it in variable statusCode.
	    int statusCode = Integer.parseInt(firstLine.substring(9,12));

	    // Print status code to console
	    System.out.println("Status code: " + statusCode);

	    // Output to the console the entire header of the response,
	    // which ends with a blank line (output this as well).
	    // >>> YOUR CODE TO ACCOMPLISH THIS GOES NEXT <<<
	    String line;
		do {
			line = in.readLine();
			System.out.println(line);
		} while (!(line.isEmpty()));
	    // If server's response was a 200, accumulate the lines of
	    // the body of the response in the StringBuffer
	    // "htmlAccum".  Otherwise, store in this variable a
	    // message containing the status code.
	    StringBuilder htmlAccum = new StringBuilder();
	    if (statusCode != 200) {
			htmlAccum.append("Server responded with status code " +
				 statusCode);
	    }
	    else {
		// Input the body of the response a line at a time and
		// accumulate the lines in the variable htmlAccum.  It
		// is not necessary to preserve newline characters
		// when creating this variable.  Also print the entire
		// body to the console.
		// >>> YOUR CODE TO ACCOMPLISH THIS GOES NEXT <<<
			String file_body = "";
			line = in.readLine();
			do {
				System.out.println(line);
				file_body = file_body + line;
			}while ((line = in.readLine()) != null);
			htmlAccum.append(file_body);
	    }
	    // Pass the accumulated HTML string (or the message with
	    // status code) to a Java JEditorPane object for
	    // rendering.  Code referenced by
	    // https://docs.oracle.com/javase/tutorial/uiswing/components/editorpane.html
	    // was helpful for writing this.
	    SwingUtilities.invokeLater(new Runnable() {
		    @Override
		    public void run() {
			initAndShowGUI(htmlAccum.toString());
		    }
		});
        }
        catch (Exception e) {
            e.printStackTrace(); // Print any exception messages
        }
        return;
    }

    // Render HTML much as a browser would and display it on the screen.
    // Following page was helpful in writing this method:
    // http://www.java2s.com/Tutorials/Java/Swing/JEditorPane/Display_html_string_in_JEditorPane_in_Java.htm
    
    private static void initAndShowGUI(String html) {
	// This method is invoked on Swing thread
	JFrame frame = new JFrame("WebClient");
	frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	frame.setSize(new Dimension(400,300));
	JEditorPane editorPane = new JEditorPane();
	editorPane.setEditable(false);
	editorPane.setContentType("text/html");
	editorPane.setText(html);
       	JScrollPane scrollPane = new JScrollPane(editorPane);
	frame.getContentPane().add(scrollPane);
	frame.setVisible(true);
    }
}
