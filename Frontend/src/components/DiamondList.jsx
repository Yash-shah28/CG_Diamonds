import DiamondListRow from "./DiamondListRow";

export default function DiamondList({ diamonds }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-left">
                <thead className="sticky top-0 bg-white z-10 shadow">
                    <tr>
                        <th></th>
                        <th>Media</th>
                        <th>Status</th>
                        <th>Shape</th>
                        <th>Carat</th>
                        <th>Col</th>
                        <th>Cla</th>
                        <th>Cut</th>
                        <th>Pol</th>
                        <th>Sym</th>
                        <th>Fluor</th>
                        <th>Table</th>
                        <th>Depth</th>
                        <th>Ratio</th>
                        <th>Diamond price</th>
                    </tr>
                </thead>
                <tbody>
                    {diamonds.map((diamond) => (
                        <DiamondListRow
                            key={diamond._id}
                            diamond={diamond}
                            // isOwnDiamond={sellerAuth.seller.firstname === diamond.owner.firstname}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
