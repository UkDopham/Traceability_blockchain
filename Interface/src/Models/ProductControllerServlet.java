package Models;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

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
			Product product = SearchProductInDB(productName);
			List<Step> steps = SeachStepsInDB(productName);
			if (product != null 
					&& steps != null)
			{
			request.setAttribute("product", product);
			request.setAttribute("steps", steps);
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
	
	
	private Product SearchProductInDB(String productName)
	{
		return new Product(productName);
	}
	private List<Step> SeachStepsInDB(String productName)
	{
		List<Step> steps = new ArrayList<Step>();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-mm-yyyy", Locale.FRENCH); 
		try {
			steps.add(new Step("Coton", "Suisse", simpleDateFormat.parse("01-01-2020"),simpleDateFormat.parse("10-01-2020")));
			steps.add(new Step("Egrenage", "France", simpleDateFormat.parse("12-01-2020"),simpleDateFormat.parse("20-01-2020")));
			steps.add(new Step("Filature", "Allemagne", simpleDateFormat.parse("21-01-2020"),simpleDateFormat.parse("10-02-2020")));
			steps.add(new Step("Manufacture", "Roumanie", simpleDateFormat.parse("12-02-2020"),simpleDateFormat.parse("14-02-2020")));
			steps.add(new Step("Expédition", "Italie", simpleDateFormat.parse("30-03-2020")));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return steps;
	}
	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
	}

}
