<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scout_equipment', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('category', ['tendas', 'sacos_cama', 'mochilas', 'cozinha', 'ferramentas', 'outros'])->default('outros');
            $table->integer('quantity')->default(1);
            $table->enum('condition', ['excelente', 'bom', 'precisa_reparacao', 'danificado'])->default('bom');
            $table->string('location')->nullable(); // Onde está guardado
            $table->date('last_inspection_date')->nullable();
            $table->date('next_inspection_date')->nullable();
            $table->date('purchase_date')->nullable();
            $table->text('notes')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scout_equipment');
    }
};
