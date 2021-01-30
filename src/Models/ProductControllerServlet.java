package Models;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/ProductControllerServlet")
public class ProductControllerServlet extends HttpServlet {	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			String productName = request.getParameter("searchProduct");
			System.out.println(productName);
			Product product = SearchInDB(productName);
			if (product != null)
			{
			request.setAttribute("product", product);
			
			RequestDispatcher dispatcher = request.getRequestDispatcher("/ProductPage.jsp");
			dispatcher.forward(request, response);
			}
			else // Show main page or error page 404
			{
				RequestDispatcher dispatcher = request.getRequestDispatcher("/MainPage.jsp");
				dispatcher.forward(request, response);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	private Product SearchInDB(String productName)
	{
		return new Product(productName);
	}
	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
	}

}
