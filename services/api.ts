import { ProductResponse, Product } from '../types/product';

const BASE_URL = 'https://dummyjson.com';


function terjemahKategori(category: string): string {
  const map: Record<string, string> = {
    'beauty': 'Kecantikan',
    'fragrances': 'Parfum',
    'furniture': 'Furnitur',
    'groceries': 'Kebutuhan Pokok',
    'home-decoration': 'Dekorasi Rumah',
    'kitchen-accessories': 'Peralatan Dapur',
    'laptops': 'Laptop',
    'mens-shirts': 'Baju Pria',
    'mens-shoes': 'Sepatu Pria',
    'mens-watches': 'Jam Tangan Pria',
    'mobile-accessories': 'Aksesoris HP',
    'motorcycle': 'Motor',
    'motorcycles': 'Motor',
    'skin-care': 'Perawatan Kulit',
    'skincare': 'Perawatan Kulit',
    'smartphones': 'Smartphone',
    'electronics': 'Elektronik',
    'sports-accessories': 'Perlengkapan Olahraga',
    'sunglasses': 'Kacamata',
    'tablets': 'Tablet',
    'tops': 'Atasan Wanita',
    'vehicle': 'Kendaraan',
    'womens-bags': 'Tas Wanita',
    'womens-dresses': 'Gaun Wanita',
    'womens-jewellery': 'Perhiasan Wanita',
    'womens-shoes': 'Sepatu Wanita',
    'womens-watches': 'Jam Tangan Wanita',
    'books': 'Buku',
    'fashion': 'Fashion',
    'laptops-accessories': 'Aksesoris Laptop',
  };
  return map[category?.toLowerCase()] ?? category;
}


function buatDeskripsiIndonesia(product: Product): string {
  const cat = product.category?.toLowerCase() ?? '';
  const nama = product.title ?? 'Barang';
  const merk = product.brand ? `dari ${product.brand}` : '';
  const rating = product.rating?.toFixed(1) ?? '0';
  const stok = product.stock ?? 0;

  const deskMap: Record<string, string> = {
    'beauty': `${nama} ${merk} adalah produk kecantikan berkualitas tinggi yang cocok untuk perawatan sehari-hari. Diformulasikan dengan bahan-bahan pilihan yang aman untuk kulit, memberikan hasil optimal dengan penggunaan rutin. Produk ini telah dinilai oleh banyak pengguna dengan rating ${rating}/5. Stok tersedia: ${stok} unit. Barang masih dalam kondisi layak pakai dan tersedia untuk mahasiswa yang membutuhkan.`,

    'fragrances': `${nama} ${merk} adalah parfum premium dengan aroma yang tahan lama dan mewah. Wewangian ini memberikan kesan elegan dan percaya diri untuk penggunaan sehari-hari maupun acara formal. Cocok sebagai hadiah maupun koleksi pribadi. Rating pengguna: ${rating}/5. Stok: ${stok} unit. Dijual oleh mahasiswa dengan kondisi baik.`,

    'furniture': `${nama} ${merk} adalah furnitur berkualitas yang cocok untuk kamar kos atau kontrakan mahasiswa. Desain modern dan fungsional, terbuat dari bahan yang kokoh dan tahan lama. Mudah dirakit dan dipindahkan. Rating: ${rating}/5. Stok: ${stok} unit. Dijual bekas dalam kondisi masih layak pakai.`,

    'groceries': `${nama} ${merk} adalah produk kebutuhan sehari-hari yang sering dibutuhkan oleh mahasiswa. Kualitas terjaga dan bersumber dari produsen terpercaya. Cocok untuk stok kamar kos. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'home-decoration': `${nama} ${merk} adalah dekorasi rumah yang cantik dan elegan, cocok untuk mempercantik kamar kos atau hunian mahasiswa. Memberikan nuansa hangat dan nyaman di ruangan. Bahan berkualitas dengan desain modern. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'kitchen-accessories': `${nama} ${merk} adalah peralatan dapur yang praktis dan mudah digunakan, sangat cocok untuk mahasiswa yang tinggal di kos dan sering masak sendiri. Terbuat dari bahan food-grade yang aman. Rating pengguna: ${rating}/5. Stok: ${stok} unit. Kondisi masih bagus.`,

    'laptops': `${nama} ${merk} adalah laptop bekas berkualitas tinggi yang sangat cocok untuk kebutuhan kuliah, mengerjakan tugas, coding, dan desain grafis. Performa handal dengan daya tahan baterai yang baik. Spesifikasi sudah memadai untuk aplikasi perkantoran dan multimedia. Rating: ${rating}/5. Stok: ${stok} unit. Dijual oleh mahasiswa yang sudah lulus.`,

    'mens-shirts': `${nama} ${merk} adalah kemeja pria berkualitas premium yang cocok untuk kegiatan kuliah, organisasi, maupun acara formal kampus. Bahan nyaman dan mudah dirawat. Tersedia dalam kondisi bekas layak pakai. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'mens-shoes': `${nama} ${merk} adalah sepatu pria stylish yang cocok dipakai untuk kuliah, nongkrong, maupun acara semi-formal. Bahan berkualitas dengan sol yang nyaman untuk pemakaian seharian. Kondisi bekas masih layak pakai. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'mens-watches': `${nama} ${merk} adalah jam tangan pria elegan yang cocok untuk tampil percaya diri di kampus maupun acara formal. Desain klasik dengan ketepatan waktu yang baik. Dijual bekas dalam kondisi masih berfungsi dengan baik. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'mobile-accessories': `${nama} ${merk} adalah aksesoris ponsel berkualitas yang berguna untuk melindungi dan meningkatkan fungsi smartphone Anda. Kompatibel dengan berbagai tipe HP populer. Cocok untuk mahasiswa yang aktif. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'skin-care': `${nama} ${merk} adalah produk perawatan kulit yang efektif dan aman digunakan setiap hari. Diformulasikan khusus untuk menjaga kelembapan dan kesehatan kulit. Cocok untuk berbagai jenis kulit. Rating: ${rating}/5. Stok: ${stok} unit. Masih dalam kondisi baik.`,

    'skincare': `${nama} ${merk} adalah produk perawatan kulit pilihan mahasiswa yang aktif. Membantu menjaga kulit tetap sehat dan bercahaya meskipun sering terpapar cuaca luar. Bahan alami, ringan di kulit. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'smartphones': `${nama} ${merk} adalah smartphone bekas berkualitas tinggi yang cocok untuk kebutuhan komunikasi, kuliah online, dan media sosial. Layar jernih, kamera memadai, dan performa lancar untuk multitasking sehari-hari. Rating: ${rating}/5. Stok: ${stok} unit. Dijual mahasiswa dalam kondisi normal berfungsi.`,

    'electronics': `${nama} ${merk} adalah perangkat elektronik berkualitas yang sangat berguna untuk mendukung aktivitas belajar dan kehidupan sehari-hari mahasiswa. Kondisi bekas masih berfungsi dengan baik. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'sports-accessories': `${nama} ${merk} adalah perlengkapan olahraga berkualitas yang cocok untuk kegiatan fisik rutin mahasiswa. Mendukung aktivitas olahraga dengan lebih nyaman dan efektif. Kondisi bekas, masih layak pakai. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'sunglasses': `${nama} ${merk} adalah kacamata hitam stylish yang memberikan perlindungan dari sinar UV sekaligus menambah penampilan keren saat di kampus maupun di luar ruangan. Lensa jernih, frame kokoh. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'tablets': `${nama} ${merk} adalah tablet bekas berkualitas yang cocok untuk membaca buku digital, mengerjakan tugas, dan presentasi kuliah. Layar lebar memudahkan belajar dengan nyaman. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'tops': `${nama} ${merk} adalah atasan wanita yang modis dan nyaman dipakai untuk kuliah sehari-hari. Bahan adem, desain stylish namun tetap sopan untuk lingkungan kampus. Kondisi bekas masih bagus. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'vehicle': `${nama} ${merk} adalah kendaraan bekas yang cocok untuk mobilitas mahasiswa sehari-hari dari dan ke kampus. Kondisi mesin masih berjalan normal. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'motorcycles': `${nama} ${merk} adalah motor bekas yang cocok untuk mobilitas mahasiswa ke kampus, kos, maupun tempat kerja. Irit bahan bakar dan mudah diparkir. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'womens-bags': `${nama} ${merk} adalah tas wanita berkualitas premium yang cocok digunakan untuk kuliah, nongkrong, maupun acara formal. Ruang penyimpanan lega, bahan tahan lama. Kondisi bekas, masih sangat layak pakai. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'womens-dresses': `${nama} ${merk} adalah gaun wanita elegan yang cocok untuk acara kampus, wisuda, maupun pertemuan formal lainnya. Bahan nyaman dan jahitan rapi. Kondisi bekas masih sangat baik. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'womens-jewellery': `${nama} ${merk} adalah perhiasan wanita cantik yang cocok untuk melengkapi penampilan di kampus maupun acara spesial. Bahan berkualitas dengan desain elegan. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'womens-shoes': `${nama} ${merk} adalah sepatu wanita stylish yang nyaman dipakai untuk kegiatan kampus maupun acara semi-formal. Sol empuk dan desain trendi. Kondisi bekas masih layak pakai. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'womens-watches': `${nama} ${merk} adalah jam tangan wanita elegan yang mempercantik penampilan sekaligus membantu mengatur waktu dengan tepat. Desain cantik dan ringan di pergelangan tangan. Rating: ${rating}/5. Stok: ${stok} unit.`,

    'books': `${nama} adalah buku kuliah bekas dalam kondisi masih layak baca. Isi lengkap, halaman tidak robek, dan cocok digunakan sebagai referensi belajar. Sangat direkomendasikan untuk mahasiswa yang ingin menghemat pengeluaran. Rating: ${rating}/5. Stok: ${stok} unit.`,
  };

  return (
    deskMap[cat] ??
    `${nama} ${merk} adalah barang bekas berkualitas yang dijual oleh mahasiswa dengan kondisi masih layak pakai. Cocok untuk mendukung kebutuhan belajar dan kehidupan sehari-hari di kampus. Rating pengguna: ${rating}/5. Stok tersedia: ${stok} unit.`
  );
}


export function formatPrice(priceUSD: number): string {
  const priceIDR = Math.round(priceUSD * 16000);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(priceIDR);
}

export function normalizeProduct(product: Product): Product {
  return {
    ...product,
    category: terjemahKategori(product.category),

    title: product.title,
  
    description: buatDeskripsiIndonesia(product),
  };
}

export async function getProducts(): Promise<ProductResponse> {
  const response = await fetch(`${BASE_URL}/products?limit=30`);
  if (!response.ok) {
    throw new Error('Gagal memuat produk dari server. Periksa koneksi internet Anda.');
  }

  const data = await response.json();
  return {
    ...data,
    products: data.products.map((product: Product) => normalizeProduct(product)),
  };
}
