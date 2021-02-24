package Models;

import java.util.ArrayList;
import java.util.List;

public class Product {
	private String _name;
	
	public String get_name() {
		return _name;
	}
	public void set_name(String _name) {
		this._name = _name;
	}
	private List<Intermediary> _intermediaries; //Order from first to last intermediary in the supply chain
	public Product(String _name) {
		super();
		this._name = _name;
		this._intermediaries = new ArrayList<Intermediary>();
	}
	
	
}
