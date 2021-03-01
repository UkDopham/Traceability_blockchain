package Models;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Step {
	private String _name;
	private String _location;
	private String _startDate;
	private String _endDate;
	
	public String get_name() {
		return _name;
	}

	public void set_name(String _name) {
		this._name = _name;
	}

	public String get_location() {
		return _location;
	}

	public void set_location(String _location) {
		this._location = _location;
	}

	public String get_startDate() {
		return _startDate;
	}

	public void set_startDate(String _startDate) {
		this._startDate = _startDate;
	}

	public String get_endDate() {
		return _endDate;
	}

	public void set_endDate(String _endDate) {
		this._endDate = _endDate;
	}

	public Step(String _name, String _location, Date _startDate, Date _endDate) {
		super();
		SimpleDateFormat dt = new SimpleDateFormat("dd/mm/yyyy");
		this._name = _name;
		this._location = _location;
		this._startDate = dt.format(_startDate);
		this._endDate = dt.format(_endDate);
	}
	
	public Step(String _name, String _location, Date _startDate) {
		super();
		SimpleDateFormat dt = new SimpleDateFormat("dd/mm/yyyy");
		this._name = _name;
		this._location = _location;
		this._startDate = dt.format(_startDate);
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		String value = this._name + " " + this._location + " " + this._startDate;
		if (this._endDate != null){
			value += " " + this._endDate;
			}
		return value;
	}
	
	
}
