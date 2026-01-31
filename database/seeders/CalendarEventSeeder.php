<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CalendarEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            // Outubro 2025
            ['title' => 'Abertura de ano / Passagens', 'start_date' => '2025-10-04', 'is_all_day' => true],
            ['title' => 'Eucaristia e Procissão Padroeira', 'start_date' => '2025-10-12', 'is_all_day' => true],
            ['title' => 'Fim de semana da família', 'start_date' => '2025-10-18', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2025-10-25', 'is_all_day' => true],
            // Novembro 2025
            ['title' => 'Fim de semana da família', 'start_date' => '2025-11-01', 'is_all_day' => true],
            ['title' => 'Reunião Semanal + Eucaristia', 'start_date' => '2025-11-08', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2025-11-15', 'is_all_day' => true],
            ['title' => 'EGO - Encontro de Guias do Oeste', 'start_date' => '2025-11-14', 'end_date' => '2025-11-16', 'is_all_day' => false],
            ['title' => 'Reunião de Pais e EE', 'start_date' => '2025-11-21', 'is_all_day' => false],
            ['title' => 'Reunião Semanal', 'start_date' => '2025-11-22', 'is_all_day' => true],
            ['title' => 'Noite de Fados', 'start_date' => '2025-11-29', 'is_all_day' => false],
            ['title' => 'Banco Alimentar', 'start_date' => '2025-11-30', 'is_all_day' => true],
            // Dezembro 2025
            ['title' => 'Mercado de Natal', 'start_date' => '2025-12-05', 'end_date' => '2025-12-08', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2025-12-06', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2025-12-13', 'is_all_day' => true],
            ['title' => 'Partilha Luz da Paz de Belém', 'start_date' => '2025-12-15', 'is_all_day' => true],
            ['title' => 'Atividade de Natal', 'start_date' => '2025-12-20', 'end_date' => '2025-12-21', 'is_all_day' => true],
            ['title' => 'Fim de semana da família', 'start_date' => '2025-12-27', 'is_all_day' => true],
            // Janeiro 2026
            ['title' => 'Fim de semana da família', 'start_date' => '2026-01-03', 'is_all_day' => true],
            ['title' => 'Reunião Semanal + Eucaristia', 'start_date' => '2026-01-10', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2026-01-17', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2026-01-24', 'is_all_day' => true],
            ['title' => 'Reunião Semanal + Bolos', 'start_date' => '2026-01-31', 'is_all_day' => true],
            // Fevereiro 2026
            ['title' => 'Festival das Sopas', 'start_date' => '2026-02-01', 'is_all_day' => true],
            ['title' => 'Reunião Semanal + Eucaristia', 'start_date' => '2026-02-07', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2026-02-14', 'is_all_day' => true],
            ['title' => 'Carnaval Ribamar', 'start_date' => '2026-02-15', 'end_date' => '2026-02-17', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2026-02-21', 'is_all_day' => true],
            ['title' => 'Dia de BP', 'start_date' => '2026-02-22', 'is_all_day' => true],
            ['title' => 'Fim de semana da família', 'start_date' => '2026-02-28', 'is_all_day' => true],
            // Março 2026
            ['title' => 'Reunião Semanal + Eucaristia', 'start_date' => '2026-03-07', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2026-03-14', 'is_all_day' => true],
            ['title' => '1º Encontro ACANUC / Reunião', 'start_date' => '2026-03-21', 'is_all_day' => true],
            ['title' => 'Atividade Páscoa', 'start_date' => '2026-03-28', 'end_date' => '2026-03-29', 'is_all_day' => true],
            // Abril 2026
            ['title' => 'Paixão de Cristo', 'start_date' => '2026-04-03', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2026-04-11', 'is_all_day' => true],
            ['title' => 'São Jorge', 'start_date' => '2026-04-18', 'is_all_day' => true],
            ['title' => 'Fim de semana da família', 'start_date' => '2026-04-25', 'is_all_day' => true],
            ['title' => 'Expo-Lourinhã (Início)', 'start_date' => '2026-04-30', 'is_all_day' => true],
            // Maio 2026
            ['title' => 'Expo-Lourinhã', 'start_date' => '2026-05-01', 'end_date' => '2026-05-03', 'is_all_day' => true],
            ['title' => 'Fim de semana da família', 'start_date' => '2026-05-09', 'is_all_day' => true],
            ['title' => 'Reunião Semanal + Eucaristia', 'start_date' => '2026-05-16', 'is_all_day' => true],
            ['title' => 'Trail Rota dos Piratas', 'start_date' => '2026-05-17', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2026-05-23', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2026-05-30', 'is_all_day' => true],
            // Junho 2026
            ['title' => 'Corpo de Deus', 'start_date' => '2026-06-04', 'is_all_day' => true],
            ['title' => '2º Encontro ACANUC / Reunião', 'start_date' => '2026-06-06', 'is_all_day' => true],
            ['title' => 'Fim de semana da família', 'start_date' => '2026-06-13', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2026-06-20', 'is_all_day' => true],
            ['title' => 'Reunião Semanal', 'start_date' => '2026-06-27', 'is_all_day' => true],
            // Julho 2026
            ['title' => 'Reunião Semanal', 'start_date' => '2026-07-04', 'is_all_day' => true],
            ['title' => 'Aniversário 1066', 'start_date' => '2026-07-10', 'is_all_day' => true],
            ['title' => '31º Aniversário Agrupamento', 'start_date' => '2026-07-11', 'end_date' => '2026-07-12', 'is_all_day' => true],
            ['title' => 'ACANUC', 'start_date' => '2026-07-26', 'end_date' => '2026-07-31', 'is_all_day' => true],
            // Setembro 2026
            ['title' => 'Fátima (Peregrinação Nacional)', 'start_date' => '2026-09-26', 'end_date' => '2026-09-27', 'is_all_day' => true],
        ];

        foreach ($events as $event) {
            \App\Models\CalendarEvent::create($event);
        }
    }
}
