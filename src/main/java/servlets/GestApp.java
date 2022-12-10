package servlets;

import java.io.IOException;
import java.sql.Date;

import database.Database;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class GestApp
 */
@WebServlet("/Test")
public class GestApp extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private Database database;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GestApp() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (database == null) {
			try {
				database = Database.load();
				database.save();
			} catch (ClassNotFoundException | IOException e) {
				e.printStackTrace();
			}
		}

		//response.getWriter().append("Served at: ").append(request.getContextPath());
		this.getServletContext().getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
