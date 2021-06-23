import React, { Suspense } from "react";
import SuspenseFallbackComponent from "../components/SuspenseFallbackComponent";

const SuspenseThis = (RegularComponent) => {
	const SuspensedComponent = (props) => {
		return (
			<Suspense fallback={<SuspenseFallbackComponent />}>
				<RegularComponent {...props} />
			</Suspense>
		);
	};
	return SuspensedComponent;
};

export default SuspenseThis;
