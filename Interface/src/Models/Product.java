package Models;

import java.util.ArrayList;
import java.util.List;

public class Product {
	private String _name;
	private String _reference;
	private int _price;
	private String _picture;
	private List<Intermediary> _intermediaries; //Order from first to last intermediary in the supply chain
	
	public String get_reference() {
		return _reference;
	}
	public void set_reference(String _reference) {
		this._reference = _reference;
	}
	public int get_price() {
		return _price;
	}
	public void set_price(int _price) {
		this._price = _price;
	}
	public String get_picture() {
		return _picture;
	}
	public void set_picture(String _picture) {
		this._picture = _picture;
	}
	
	public String get_name() {
		return _name;
	}
	public void set_name(String _name) {
		this._name = _name;
	}
	
	
	public Product(String _name, String _reference, int _price, String _picture) {
		super();
		this._name = _name;
		this._reference = _reference;
		this._price = _price;
		this._picture = _picture;
		this._intermediaries = new ArrayList<Intermediary>();
	}
	
	
}
