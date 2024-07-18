import "./LoadingIndicator.css";

export default function LoadingIndicator(props: { scale?: number }) {
	return <div class="loader" style={{ scale: props.scale ?? 1 }}></div>;
}
