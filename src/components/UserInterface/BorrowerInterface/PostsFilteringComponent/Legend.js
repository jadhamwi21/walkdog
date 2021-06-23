import React from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
class Legend extends React.Component {
	createLegendElement() {
		const map = this.props.map;
		const { FlyToOwner, FlyToBorrower } = this.props;
		console.log(FlyToOwner, FlyToBorrower);
		const legend = L.control({ position: "bottomright" });
		legend.onAdd = () => {
			const LegendContainerDiv = L.DomUtil.create("div", "Markers Legend");
			LegendContainerDiv.style =
				"background-color:rgba(0,0,0,0.7);height:fit-content;width:fit-content;padding:40px;color:white;font-weight:800;";
			const LegendLogoStyle =
				"height:10px;width:10px;display:inline-block;background-color:#2e34cf;margin-right:10px;border-radius:50%";
			const YourLocationDiv = L.DomUtil.create("div", "Your Location");
			const OwnerLocationDiv = L.DomUtil.create("div", "Owner Location");
			const YourLocationIcon = L.DomUtil.create("span", "YourLocationIcon");
			const OwnerLocationIcon = L.DomUtil.create("span", "OwnerLocationIcon");
			YourLocationIcon.style = LegendLogoStyle;
			OwnerLocationIcon.style = LegendLogoStyle;
			YourLocationDiv.addEventListener("click", FlyToBorrower);
			OwnerLocationDiv.addEventListener("click", FlyToOwner);
			YourLocationDiv.appendChild(YourLocationIcon);
			OwnerLocationDiv.appendChild(OwnerLocationIcon);
			YourLocationDiv.innerHTML += "Your Location";
			OwnerLocationDiv.innerHTML += "Owner Location";
			LegendContainerDiv.appendChild(YourLocationDiv);
			LegendContainerDiv.appendChild(OwnerLocationDiv);
			return LegendContainerDiv;
		};
		legend.addTo(map);
	}
	componentDidMount() {
		this.createLegendElement();
	}
	render() {
		return null;
	}
}
const withMap = (Component) => {
	return function WrappedComponent(props) {
		const map = useMap();
		return <Component {...props} map={map} />;
	};
};

export default withMap(Legend);
