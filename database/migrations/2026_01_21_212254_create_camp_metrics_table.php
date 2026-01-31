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
        Schema::create('camp_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scout_id')->constrained('scouts')->onDelete('cascade');
            $table->integer('nights_count');
            $table->date('date_logged');
            $table->foreignId('validated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('camp_metrics');
    }
};
