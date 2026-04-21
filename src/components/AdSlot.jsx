// Replace the contents of this component with your Google AdSense script on production.
// Example: <ins class="adsbygoogle" ...></ins>
// See: https://support.google.com/adsense/answer/7477845

export default function AdSlot({ slot, position }) {
  return (
    <div
      className="w-full border-2 border-dashed border-gray-200 bg-gray-50 rounded-lg flex items-center justify-center py-8 my-6"
      data-ad-slot={slot}
      data-ad-position={position}
      aria-label="Advertisement placeholder"
    >
      <div className="text-center text-gray-400 text-sm select-none">
        <div className="text-2xl mb-1">📢</div>
        <div className="font-medium">Advertisement</div>
        <div className="text-xs mt-0.5 text-gray-300">
          Replace with AdSense unit ({position})
        </div>
      </div>
    </div>
  );
}
