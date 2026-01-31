<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            [
                'name' => 'Lobitos',
                'age_range' => '6-10 anos',
                'color' => '#FFD700', // Yellow
                'patron' => 'São Francisco de Assis',
                'motto' => 'Da melhor vontade',
                'description' => 'A Alcateia é a secção dos mais novos, baseada no Livro da Selva.',
            ],
            [
                'name' => 'Exploradores',
                'age_range' => '10-14 anos',
                'color' => '#228B22', // Green
                'patron' => 'São Tiago',
                'motto' => 'Sempre Alerta',
                'description' => 'A Expedição foca-se na descoberta e na aventura.',
            ],
            [
                'name' => 'Pioneiros',
                'age_range' => '14-18 anos',
                'color' => '#0000FF', // Blue
                'patron' => 'São Pedro',
                'motto' => 'Sempre Alerta',
                'description' => 'A Comunidade foca-se na construção e no empreendimento.',
            ],
            [
                'name' => 'Caminheiros',
                'age_range' => '18-22 anos',
                'color' => '#FF0000', // Red
                'patron' => 'São Paulo',
                'motto' => 'Servir',
                'description' => 'O Clã foca-se no caminho, na jornada e no serviço.',
            ],
        ];

        foreach ($sections as $section) {
            \App\Models\Section::create($section);
        }
    }
}
