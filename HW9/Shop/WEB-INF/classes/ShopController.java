import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.ArrayList;
import java.util.Collections;


/**
 * Simple counter servlet
 */
public class ShopController extends HttpServlet
{
    /**
     * Respond to any HTTP GET request with a
     * page displaying the number of visits this session.
     */
    ArrayList<String> current_cart = new ArrayList<String>();
    ArrayList<ArrayList<String>> custormer_order = new ArrayList<ArrayList<String>>();

    public void doGet (HttpServletRequest request,
                       HttpServletResponse response)
      throws ServletException, IOException
        {

	    HttpSession session = request.getSession();
      String path = request.getPathInfo();

	    if (path == "/" || path == null) {
        getServletContext().getNamedDispatcher("login").forward(request, response);
	    } else if (path.startsWith("/end_login")){
        String name = request.getParameter("name");
        current_cart.clear();
        custormer_order.clear();
        session.setAttribute("user_name", name);
        getServletContext().getNamedDispatcher("shop").forward(request, response);



      } else if ( path.startsWith("/add_to_cart")){
        String item = request.getParameter("item");
        current_cart.add(item);
        session.setAttribute("items", current_cart);
        getServletContext().getNamedDispatcher("shop").forward(request, response);



      } else if (path.startsWith("/place_order")){
        ArrayList<String> copy = new ArrayList<String>();
        copy.addAll(current_cart);
        custormer_order.add(copy);
        session.setAttribute("all_orders", custormer_order);
        //session.setAttribute("myIndex", custormer_order.size());
        current_cart.clear();
        getServletContext().getNamedDispatcher("shop").forward(request, response);



      } else if (path.startsWith("/display_order")){
        //session.setAttribute("all_orders", custormer_order);
        getServletContext().getNamedDispatcher("history").forward(request, response);



      } else if (path.startsWith("/continue_shopping")){
        getServletContext().getNamedDispatcher("shop").forward(request, response);
      }
    }
}
