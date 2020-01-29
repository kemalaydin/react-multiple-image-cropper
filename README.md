## Cropper Genel Ayarları

> !! Henüz Paket Haline Getirilmemiştir.

### `cropper_aspect_x`
Cropper için aspect değerlerinden x bağımlılığını düzenler. Kullanabilmek için sayfa içerisinde id değeri `cropper_aspect_x` olan bir gizli input kullanabilirsiniz. Vereceğiniz value aspect_x değerini belirleyecektir.

Ex.
`<input type="hidden" id="cropper_aspect_x" value="100" />`

### `cropper_aspect_y`
Cropper için aspect değerlerinden y bağımlılığını düzenler. Kullanabilmek için sayfa içerisinde id değeri `cropper_aspect_y` olan bir gizli input kullanabilirsiniz. Vereceğiniz value aspect_x değerini belirleyecektir.

Ex.
`<input type="hidden" id="cropper_aspect_y" value="100" />`

### `cropper_with`
Cropper ilk çalıştığındaki otomatik seçili cropper genişliğini belirtir. Boş bırakıldığı taktirde kullanılmaz. Kullanabilmek için sayfa içerisinde id değeri `cropper_with` olan bir gizli input kullanabilirsiniz. Vereceğiniz value aspect_x değerini belirleyecektir.

Ex.
`<input type="hidden" id="cropper_with" value="50" />`

### `cropper_height`
Cropper ilk çalıştığındaki otomatik seçili cropper yüksekliğini belirtir. Boş bırakıldığı taktirde kullanılmaz. Kullanabilmek için sayfa içerisinde id değeri `cropper_height` olan bir gizli input kullanabilirsiniz. Vereceğiniz value aspect_x değerini belirleyecektir.

Ex.
`<input type="hidden" id="cropper_height" value="50" />`

### `cropper_x`
Cropper ilk çalıştığındaki otomatik seçili cropper alanının başlayacağı x konumunu belirtir. Boş bırakıldığı taktirde kullanılmaz. Kullanabilmek için sayfa içerisinde id değeri `cropper_x` olan bir gizli input kullanabilirsiniz. Vereceğiniz value aspect_x değerini belirleyecektir.

Ex.
`<input type="hidden" id="cropper_x" value="0" />`

### `cropper_y`
Cropper ilk çalıştığındaki otomatik seçili cropper alanının başlayacağı x konumunu belirtir. Boş bırakıldığı taktirde kullanılmaz. Kullanabilmek için sayfa içerisinde id değeri `cropper_y` olan bir gizli input kullanabilirsiniz. Vereceğiniz value aspect_x değerini belirleyecektir.

Ex.
`<input type="hidden" id="cropper_y" value="0" />`



## Cropper Stil Tanımlamaları
Cropper içerisinde kullanılan inputların ve resimlerin classları mevcuttur. Bu classları bypass ederek kendi sisteminize uygun hala getirebilirsiniz.

### `.cropper_image_select`
Resim seçiçi inputun classıdır. File tipinde bir inputtur.

### `.imageSelectedMultiple`
Yüklenen resimlerin tamamını barındıran container class.

### `.singleImageMultiple`
Yüklenen her bir resmin container class'ı

### `.__cropper_image`
Yüklenen her bir resmin class'ı. ( Direkt olarak img tagına ait class )

### `.cropper_image_title`
Yüklenen her resmin sahip olduğu Başlık inputu class'ı. Text tipinde bir inputtur.



## Cropper Çıktıları
Her yüklenen resim için cropper aynı isimde inputlar oluşturur. Bu inputları sunucu tarafınızda array olarak karşılayabilirsiniz.

### `name="cropper_image[]"`
Hidden tipinde bir inputtur. Kırpılan resmin base64 kodlarını barındırır. Birden fazla resim olması durumunda array formatında veri döndürür.  -- Hidden nesnedir, sayfada kullanıcıya gösterilmez. --

### `name="cropper_image_title[]"`
Text tipinde bir inputtur. Eklenen resim için başlık bilgisi barındırır. Birden fazla resim olması durumunda array formatında veri döndürür. 

