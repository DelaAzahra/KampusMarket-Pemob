export function validateName(name: string): string {
  if (!name || name.trim() === '') {
    return 'Nama lengkap wajib diisi';
  }
  return '';
}

export function validateEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim() === '') {
    return 'Email wajib diisi';
  }
  if (!emailRegex.test(email)) {
    return 'Format email tidak valid (contoh: nama@domain.com)';
  }
  return '';
}

export function validatePassword(password: string): string {
  if (!password) {
    return 'Password wajib diisi';
  }
  if (password.length < 6) {
    return 'Password minimal harus terdiri dari 6 karakter';
  }
  return '';
}
