import { useEffect, useState, useMemo } from "react";
import { api } from "@/lib/api";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowUpDown, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Product {
	id: number;
	name: string;
	productType: string;
	hsCode: string;
	brand: string | null;
	model: string | null;
}

export default function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [hsCodeSearch, setHsCodeSearch] = useState("");
	const [sortBy, setSortBy] = useState<"name" | "category" | "hsCode">("name");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await api.get<Product[]>("/products");
				setProducts(data);
				setError(null);
			} catch (err) {
				console.error("Error fetching products:", err);
				setError(
					err instanceof Error ? err.message : "Failed to fetch products"
				);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	// Get unique categories
	const categories = useMemo(() => {
		const cats = new Set(products.map(p => p.productType));
		return Array.from(cats).sort();
	}, [products]);

	// Filter and sort products
	const filteredProducts = useMemo(() => {
		let filtered = products.filter(product => {
			const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory = selectedCategory === "all" || product.productType === selectedCategory;
			const matchesHsCode = product.hsCode.includes(hsCodeSearch);
			return matchesSearch && matchesCategory && matchesHsCode;
		});

		// Sort products
		filtered.sort((a, b) => {
			let aValue, bValue;
			switch (sortBy) {
				case "name":
					aValue = a.name.toLowerCase();
					bValue = b.name.toLowerCase();
					break;
				case "category":
					aValue = a.productType.toLowerCase();
					bValue = b.productType.toLowerCase();
					break;
				case "hsCode":
					aValue = a.hsCode;
					bValue = b.hsCode;
					break;
			}

			if (sortOrder === "asc") {
				return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
			} else {
				return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
			}
		});

		return filtered;
	}, [products, searchTerm, selectedCategory, hsCodeSearch, sortBy, sortOrder]);

	// Export to PDF function
	const exportToPDF = () => {
		try {
			const doc = new jsPDF();
			
			// Get current date and time for filename
			const now = new Date();
			const dateTimeString = now.toISOString().slice(0, 19).replace(/:/g, '-').replace('T', '_');
			const fileName = `TARIFF Product-List-${dateTimeString}.pdf`;
			
			// Add title
			doc.setFontSize(20);
			doc.text('Product List Report', 14, 15);
			
			// Add date and time
			doc.setFontSize(10);
			doc.text(`Generated on: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`, 14, 25);
			
			// Add filter information
			doc.setFontSize(10);
			const filters = [];
			if (searchTerm) filters.push(`Search: "${searchTerm}"`);
			if (selectedCategory !== "all") filters.push(`Category: ${selectedCategory}`);
			if (hsCodeSearch) filters.push(`HS Code: ${hsCodeSearch}`);
			if (filters.length > 0) {
				doc.text(`Filters: ${filters.join(', ')}`, 14, 32);
			}
			doc.text(`Sort: ${sortBy} (${sortOrder})`, 14, 39);
			doc.text(`Total Products: ${filteredProducts.length}`, 14, 46);

			// Create table data
			const tableData = filteredProducts.map(product => [
				product.id.toString(),
				product.name,
				product.productType,
				product.hsCode,
				product.brand || '-',
				product.model || '-'
			]);

			// Add table using autoTable
			autoTable(doc, {
				head: [['ID', 'Name', 'Category', 'HS Code', 'Brand', 'Model']],
				body: tableData,
				startY: 55,
				styles: { fontSize: 9 },
				headStyles: { fillColor: [66, 139, 202], textColor: 255, fontStyle: 'bold' },
				alternateRowStyles: { fillColor: [245, 245, 245] },
				margin: { left: 14, right: 14 },
				columnStyles: {
					0: { cellWidth: 15 },
					1: { cellWidth: 60 },
					2: { cellWidth: 40 },
					3: { cellWidth: 25 },
					4: { cellWidth: 25 },
					5: { cellWidth: 25 }
				}
			});

			// Save the PDF with the new filename
			doc.save(fileName);
		} catch (error) {
			console.error('Error generating PDF:', error);
			alert('Error generating PDF. Please try again.');
		}
	};

	if (loading) return <p className="p-6">Loading products...</p>;

	if (error)
		return (
			<div className="p-6">
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					<p className="font-semibold">Error:</p>
					<p>{error}</p>
				</div>
			</div>
		);

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-semibold">Products</h1>
				<Button onClick={exportToPDF} className="flex items-center gap-2">
					<Download className="h-4 w-4" />
					Export to PDF
				</Button>
			</div>

			{/* Search and Filter Controls */}
			<div className="mb-6 space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
						<Input
							placeholder="Search by product name..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-8"
						/>
					</div>

					<Select value={selectedCategory} onValueChange={setSelectedCategory}>
						<SelectTrigger>
							<SelectValue placeholder="Filter by category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							{categories.map((category) => (
								<SelectItem key={category} value={category}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
						<Input
							placeholder="Search by HS code..."
							value={hsCodeSearch}
							onChange={(e) => setHsCodeSearch(e.target.value)}
							className="pl-8"
						/>
					</div>

					<div className="flex items-center gap-2">
						<Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
							<SelectTrigger>
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name">Name</SelectItem>
								<SelectItem value="category">Category</SelectItem>
								<SelectItem value="hsCode">HS Code</SelectItem>
							</SelectContent>
						</Select>
						<Button
							variant="outline"
							size="icon"
							onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
						>
							<ArrowUpDown className="h-4 w-4" />
						</Button>
					</div>
				</div>

				<div className="text-sm text-gray-600">
					Showing {filteredProducts.length} of {products.length} products
				</div>
			</div>

			{/* Products Table */}
			<Table>
				<TableCaption>A list of available products</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Category</TableHead>
						<TableHead className="text-right">HS Code</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredProducts.map((p) => (
						<TableRow key={p.id}>
							<TableCell className="font-medium">{p.id}</TableCell>
							<TableCell>{p.name}</TableCell>
							<TableCell>{p.productType}</TableCell>
							<TableCell className="text-right">{p.hsCode}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total Products</TableCell>
						<TableCell className="text-right">
							{filteredProducts.length}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
